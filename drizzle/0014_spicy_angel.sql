CREATE TABLE `apikey` (
	`key` varchar(255) NOT NULL,
	`project_id` bigint
);

CREATE TABLE `project` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` varchar(150),
	`usage` json NOT NULL,
	`secret` varchar(255) NOT NULL,
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);

CREATE TABLE `team` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` varchar(150),
	CONSTRAINT `team_id` PRIMARY KEY(`id`)
);

CREATE TABLE `team_to_project` (
	`team_id` bigint NOT NULL,
	`project_id` bigint NOT NULL
);

CREATE TABLE `user_to_project` (
	`user_id` varchar(256) NOT NULL,
	`project_id` bigint NOT NULL
);

CREATE TABLE `user_to_team` (
	`user_id` varchar(256) NOT NULL,
	`team_id` bigint NOT NULL
);

ALTER TABLE `contact` MODIFY COLUMN `name` varchar(64) NOT NULL;
ALTER TABLE `contact` MODIFY COLUMN `email` varchar(64) NOT NULL;
ALTER TABLE `contact` MODIFY COLUMN `message` varchar(200) NOT NULL;
ALTER TABLE `apikey` ADD CONSTRAINT `apikey_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `team_to_project` ADD CONSTRAINT `team_to_project_team_id_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `team_to_project` ADD CONSTRAINT `team_to_project_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `user_to_project` ADD CONSTRAINT `user_to_project_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_to_project` ADD CONSTRAINT `user_to_project_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `user_to_team` ADD CONSTRAINT `user_to_team_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_to_team` ADD CONSTRAINT `user_to_team_team_id_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE cascade ON UPDATE no action;