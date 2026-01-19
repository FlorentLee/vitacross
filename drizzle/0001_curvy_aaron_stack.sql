CREATE TABLE `medical_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileUrl` text NOT NULL,
	`fileSize` int,
	`mimeType` varchar(100),
	`fileType` varchar(50),
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medical_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patient_consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`medicalCondition` text NOT NULL,
	`treatmentType` varchar(100),
	`preferredSpecialty` varchar(100),
	`medicalFilesUrl` text,
	`medicalFilesKey` text,
	`status` enum('pending','reviewing','approved','rejected','completed') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `patient_consultations_id` PRIMARY KEY(`id`)
);
