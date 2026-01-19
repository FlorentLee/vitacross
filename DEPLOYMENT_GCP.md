# Deploying to Google Cloud

This application is a unified Node.js fullstack app (React Frontend + Express/tRPC Backend). The recommended deployment target is **Google Cloud Run** connected to **Cloud SQL (PostgreSQL)**, with automated deployments managed by **Google Cloud Build**.

## Prerequisites

1.  [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated.
2.  A Google Cloud Project with the Cloud Build, Cloud Run, and Artifact Registry APIs enabled.
3.  `git` initialized in your project directory.

## 1. Setup Cloud SQL (PostgreSQL)

Create a PostgreSQL instance if you haven't already.

```bash
# Set your project ID
export PROJECT_ID="Vitacross"
export REGION="us-west2"
export DB_INSTANCE="vitacross-database"
export DB_NAME="inbound_medical"
export DB_USER="admin"
export DB_PASS="Vitacross260105" # Choose a strong password

# 1. Create Instance
/Users/u0150975/google-cloud-sdk/bin/gcloud sql instances create $DB_INSTANCE \
    --project=$PROJECT_ID \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=$REGION

# 2. Create Database
/Users/u0150975/google-cloud-sdk/bin/gcloud sql databases create $DB_NAME --instance=$DB_INSTANCE

# 3. Create User
/Users/u0150975/google-cloud-sdk/bin/gcloud sql users create $DB_USER --instance=$DB_INSTANCE --password=$DB_PASS
```

### Finding Your Instance Connection Name

The **Instance Connection Name** is a unique identifier for your Cloud SQL instance. You'll need it to configure Cloud Build and to connect via the Cloud SQL Auth Proxy.

You can find this value in a couple of ways:

1.  **Using the Google Cloud CLI (gcloud):**
    This is the most direct method. Run the following command in your terminal:

    ```bash
    # Make sure your $DB_INSTANCE variable is still set from the previous step
    /Users/u0150975/google-cloud-sdk/bin/gcloud sql instances describe $DB_INSTANCE --format="value(connectionName)"
    ```

    The output will be a string in the format `project-id:region:instance-name`.

2.  **From the Google Cloud Console:**
    a. Navigate to the [Cloud SQL Instances page](https://console.cloud.google.com/sql/instances) in the Google Cloud Console.
    b. Click on the instance ID of the database you created (e.g., `vitacross-database`).
    c. On the "Instance overview" page, look for the "Connection name" field in the "Connect to this instance" section.

You will need this connection name for the `_DB_INSTANCE_CONNECTION_NAME` substitution in your `cloudbuild.yaml` file.

## 2. Setup Artifact Registry

Create a Docker repository in Artifact Registry to store your container images.

```bash
export REPOSITORY="inbound-medical-repo"

/Users/u0150975/google-cloud-sdk/bin/gcloud artifacts repositories create $REPOSITORY \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker repository for Inbound Medical app"
```

## 3. Configure and Run Cloud Build

The `cloudbuild.yaml` file in the root of the project defines the automated build, push, and deploy pipeline.

1.  **Update `cloudbuild.yaml`:**
    Open the `cloudbuild.yaml` file and replace the placeholder values in the `substitutions` section with your actual project details (instance connection name, database credentials, etc.).

    **Security Note:** For production, it is highly recommended to use [Secret Manager](https://cloud.google.com/secret-manager) to handle your database password and JWT secret instead of placing them directly in the `cloudbuild.yaml` file.

## 3a. Using Google Cloud Secret Manager

Follow these steps to create secrets in Google Cloud Secret Manager and grant the Cloud Build service account permission to access them.

1.  **Create the secrets:**

   ```bash
   export PROJECT_ID="your-project-id"

   # Create JWT_SECRET
   echo -n "your-production-secret-key" | gcloud secrets create JWT_SECRET --data-file=- --project=$PROJECT_ID --replication-policy="automatic"

   # Create DB_PASS
   echo -n "your-secure-database-password" | gcloud secrets create DB_PASS --data-file=- --project=$PROJECT_ID --replication-policy="automatic"
   ```

2.  **Grant Cloud Build permissions:**

   Grant the "Secret Manager Secret Accessor" role to the Cloud Build service account for each secret.

   ```bash
   export PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
   export CLOUD_BUILD_SERVICE_ACCOUNT="$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"

   # Grant access to JWT_SECRET
   gcloud secrets add-iam-policy-binding JWT_SECRET \
     --member="serviceAccount:$CLOUD_BUILD_SERVICE_ACCOUNT" \
     --role="roles/secretmanager.secretAccessor"

   # Grant access to DB_PASS
   gcloud secrets add-iam-policy-binding DB_PASS \
     --member="serviceAccount:$CLOUD_BUILD_SERVICE_ACCOUNT" \
     --role="roles/secretmanager.secretAccessor"
   ```

3.  **How it works:**

   The updated `cloudbuild.yaml` now fetches these secrets during the deployment process. The `--update-secrets` flag in the `gcloud run deploy` command tells Cloud Run to mount the latest versions of the specified secrets as environment variables in the deployed container. This is a more secure method than passing secrets as plain text environment variables.

2.  **Submit the build:**
    Run the following command from the root of your project:

    ```bash
    /Users/u0150975/google-cloud-sdk/bin/gcloud builds submit --config cloudbuild.yaml .
    ```

    This command will:
    a.  Upload your source code (respecting `.gcloudignore`).
    b.  Execute the steps in `cloudbuild.yaml`:
        - Build the Docker image.
        - Push the image to your Artifact Registry.
        - Deploy the new image to Cloud Run.

## 4. Database Migrations

You need to apply the database schema. The easiest way is to run migrations from your local machine using **Cloud SQL Auth Proxy**.

1.  **Install Cloud SQL Auth Proxy**: [Guide](https://cloud.google.com/sql/docs/postgres/sql-proxy)
2.  **Start the proxy**:
    ```bash
    export INSTANCE_CONNECTION_NAME=$(/Users/u0150975/google-cloud-sdk/bin/gcloud sql instances describe $DB_INSTANCE --format="value(connectionName)")
    ./cloud-sql-proxy --port 5432 $INSTANCE_CONNECTION_NAME
    ```
3.  **Run migrations** (in a separate terminal):
    ```bash
    # Update .env locally to point to localhost:5432
    # DATABASE_URL=postgresql://app_user:your-secure-password@localhost:5432/inbound_medical

    pnpm run db:push
    ```

## Environment Variables

The necessary environment variables (`NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`) are now managed within the `cloudbuild.yaml` file for deployment. The `VITE_API_URL` defaults to a relative path, which is suitable for this unified deployment model.

## Understanding Cloud Run

### Is there a server instance to manage?

No. Google Cloud Run is a **serverless** platform. This means you do not need to create, configure, or manage any virtual machine (server) instances yourself. You simply provide a container image, and Cloud Run automatically handles the underlying infrastructure, scaling, and networking to run your application. This allows you to focus solely on your code.

### How do I find the IP address or URL?

Cloud Run provides a stable, public URL for each service you deploy. You do not get a static IP address; Google manages the underlying IP addresses, which can change over time.

To find your service's public URL:

1.  Go to the [Cloud Run page](https://console.cloud.google.com/run) in the Google Cloud Console.
2.  You will see a list of your services.
3.  The URL for your service will be listed in the "URL" column. Click on it to open your deployed application in a browser.
