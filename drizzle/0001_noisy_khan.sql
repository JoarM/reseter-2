CREATE TABLE `contact` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(64),
	`email` varchar(64),
	`message` varchar(200),
	CONSTRAINT `contact_id` PRIMARY KEY(`id`)
);
