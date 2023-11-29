CREATE TABLE `article` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`topic` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`edited` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`author` text NOT NULL,
	FOREIGN KEY (`topic`) REFERENCES `topic`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author`) REFERENCES `user`(`username`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer PRIMARY KEY NOT NULL,
	`topic` text,
	`article` integer,
	`user` text,
	`content` text,
	`created` integer,
	FOREIGN KEY (`topic`) REFERENCES `topic`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`article`) REFERENCES `article`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user`) REFERENCES `user`(`username`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `topic` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`username` text PRIMARY KEY NOT NULL,
	`nickname` text DEFAULT 'new user' NOT NULL,
	`email` text NOT NULL,
	`avatar` text,
	`created` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `topicIdx` ON `article` (`topic`);--> statement-breakpoint
CREATE INDEX `author` ON `article` (`author`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);