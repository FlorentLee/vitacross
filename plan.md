# Plan to Integrate Google Cloud Secret Manager

This plan outlines the steps to update the deployment process to use Google Cloud Secret Manager for handling the `JWT_SECRET` and `DB_PASS`.

## 1. Update `cloudbuild.yaml`

The `cloudbuild.yaml` file will be modified to securely fetch secrets from Secret Manager during the build process.

### Changes:

- **Remove hardcoded secrets:** The `_DB_PASS` and `_JWT_SECRET` substitutions will be removed.
- **Add a step to fetch secrets:** A new build step will be added to retrieve the secrets from Secret Manager and make them available as environment variables.
- **Update Cloud Run deployment:** The `gcloud run deploy` command will be updated to use the secrets fetched from Secret Manager.

### Proposed `cloudbuild.yaml`:

```yaml
steps:
  # 1. Build the Docker image
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPOSITORY}/${_SERVICE_NAME}:${COMMIT_SHA}",
        ".",
      ]

  # 2. Push the Docker image to Google Artifact Registry
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "push",
        "${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPOSITORY}/${_SERVICE_NAME}:${COMMIT_SHA}",
      ]

  # 3. Fetch secrets from Secret Manager
  - name: "gcr.io/cloud-builders/gcloud"
    entrypoint: "bash"
    args:
      - "-c"
      - |
        gcloud secrets versions access latest --secret="JWT_SECRET" --format="get(payload.data)" | tr '_-' '/+' | base64 -d > /workspace/jwt_secret.txt &&
        gcloud secrets versions access latest --secret="DB_PASS" --format="get(payload.data)" | tr '_-' '/+' | base64 -d > /workspace/db_pass.txt

  # 4. Deploy the new image to Google Cloud Run
  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
    entrypoint: gcloud
    args:
      - "run"
      - "deploy"
      - "${_SERVICE_NAME}"
      - "--image"
      - "${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPOSITORY}/${_SERVICE_NAME}:${COMMIT_SHA}"
      - "--region"
      - "${_REGION}"
      - "--platform"
      - "managed"
      - "--allow-unauthenticated"
      - "--add-cloudsql-instances"
      - "${_INSTANCE_CONNECTION_NAME}"
      - "--update-secrets=JWT_SECRET=JWT_SECRET:latest,DB_PASS=DB_PASS:latest"

images:
  - "${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPOSITORY}/${_SERVICE_NAME}:${COMMIT_SHA}"

substitutions:
  _REGION: "us-west1"
  _SERVICE_NAME: "inbound-medical-app"
  _REPOSITORY: "inbound-medical-repo"
  _INSTANCE_CONNECTION_NAME: "your-project-id:your-region:your-instance-name"
  _DB_USER: "admin"
  _DB_NAME: "inbound_medical"

timeout: "1200s"
```

## 2. Update `DEPLOYMENT_GCP.md`

A new section will be added to `DEPLOYMENT_GCP.md` to guide users on setting up and using Secret Manager.

### New Section: "Using Google Cloud Secret Manager"

This section will include:

-   **Creating Secrets:**
    ```bash
    export PROJECT_ID="your-project-id"

    # Create JWT_SECRET
    echo -n "your-production-secret-key" | gcloud secrets create JWT_SECRET --data-file=- --project=$PROJECT_ID --replication-policy="automatic"

    # Create DB_PASS
    echo -n "your-secure-database-password" | gcloud secrets create DB_PASS --data-file=- --project=$PROJECT_ID --replication-policy="automatic"
    ```
-   **Granting Permissions:**
    Instructions on how to grant the "Secret Manager Secret Accessor" role to the Cloud Build service account.

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
-   **Explanation of `cloudbuild.yaml` changes:**
    A brief explanation of how the updated `cloudbuild.yaml` fetches and uses the secrets.

Are you happy with this plan? I can proceed to switch to `code` mode to implement these changes.
