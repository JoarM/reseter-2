ALTER TABLE `apikey` DROP FOREIGN KEY `apikey_project_id_project_id_fk`;

ALTER TABLE `invites` DROP FOREIGN KEY `invites_user_id_auth_user_id_fk`;

ALTER TABLE `user_to_project` DROP FOREIGN KEY `user_to_project_user_id_auth_user_id_fk`;

ALTER TABLE `user_to_team` DROP FOREIGN KEY `user_to_team_user_id_auth_user_id_fk`;

ALTER TABLE `apikey` ADD CONSTRAINT `apikey_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `invites` ADD CONSTRAINT `invites_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `user_to_project` ADD CONSTRAINT `user_to_project_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `user_to_team` ADD CONSTRAINT `user_to_team_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE cascade ON UPDATE no action;