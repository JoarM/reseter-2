CREATE TABLE `invites` (
	`user_id` varchar(256) NOT NULL,
	`team_id` bigint NOT NULL
);

ALTER TABLE `invites` ADD CONSTRAINT `invites_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `invites` ADD CONSTRAINT `invites_team_id_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE cascade ON UPDATE no action;