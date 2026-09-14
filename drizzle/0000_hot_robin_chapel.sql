CREATE TABLE `incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referenceId` varchar(48) NOT NULL,
	`incidentType` enum('travel_fraud','extortion','unlicensed_recruiter','trafficking_risk','other') NOT NULL,
	`agencyName` varchar(255),
	`country` varchar(120) NOT NULL,
	`narrativeEncrypted` text NOT NULL,
	`contactMethod` enum('anonymous','email') NOT NULL,
	`contactEmailEncrypted` text,
	`attachmentKey` varchar(512),
	`attachmentName` varchar(255),
	`attachmentType` varchar(120),
	`status` enum('received','triage','referred','closed') NOT NULL DEFAULT 'received',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incidents_id` PRIMARY KEY(`id`),
	CONSTRAINT `incidents_referenceId_unique` UNIQUE(`referenceId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
