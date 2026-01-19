CREATE TYPE "public"."loginMethod" AS ENUM('email', 'google', 'apple');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'reviewing', 'approved', 'rejected', 'completed');--> statement-breakpoint
CREATE TABLE "medical_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"consultationId" serial NOT NULL,
	"fileName" varchar(255) NOT NULL,
	"fileKey" varchar(500) NOT NULL,
	"fileUrl" text NOT NULL,
	"fileSize" serial NOT NULL,
	"mimeType" varchar(100),
	"fileType" varchar(50),
	"uploadedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient_consultations" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"medicalCondition" text NOT NULL,
	"treatmentType" varchar(100),
	"preferredSpecialty" varchar(100),
	"medicalFilesUrl" text,
	"medicalFilesKey" text,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"googleId" varchar(255),
	"appleId" varchar(255),
	"name" text,
	"email" varchar(320) NOT NULL,
	"passwordHash" varchar(255),
	"loginMethod" "loginMethod" DEFAULT 'email' NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"avatar" text,
	"termsAccepted" boolean DEFAULT true NOT NULL,
	"subscribedToEmails" boolean DEFAULT true NOT NULL,
	"termsAcceptedAt" timestamp,
	"emailVerified" timestamp,
	"emailVerificationCode" varchar(64),
	"emailVerificationExpires" timestamp,
	"phone" varchar(20),
	"country" varchar(100),
	"city" varchar(100),
	"address" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_googleId_unique" UNIQUE("googleId"),
	CONSTRAINT "users_appleId_unique" UNIQUE("appleId")
);
--> statement-breakpoint
ALTER TABLE "medical_files" ADD CONSTRAINT "medical_files_consultationId_patient_consultations_id_fk" FOREIGN KEY ("consultationId") REFERENCES "public"."patient_consultations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_consultations" ADD CONSTRAINT "patient_consultations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");