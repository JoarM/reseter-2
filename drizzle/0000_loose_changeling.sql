CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);

CREATE TABLE `auth_user` (
	`id` varchar(256) NOT NULL,
	`email` varchar(128),
	`displayname` varchar(256),
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `auth_user_email_unique` UNIQUE(`email`)
);

ALTER TABLE `user_key` ADD CONSTRAINT `user_key_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;