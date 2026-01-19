ALTER TABLE `users` ADD `googleId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `microsoftId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `appleId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerificationCode` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerificationExpires` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_googleId_unique` UNIQUE(`googleId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_microsoftId_unique` UNIQUE(`microsoftId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_appleId_unique` UNIQUE(`appleId`);