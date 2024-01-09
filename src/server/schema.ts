//TODO create composite keys

import { mysqlTable, bigint, varchar, unique, json } from "drizzle-orm/mysql-core";
import { z } from "zod";

export const user = mysqlTable("auth_user", {
	id: varchar("id", { length: 256 })
	.primaryKey(),
	email: varchar("email", { length: 128 })
	.unique(),
	displayname: varchar("displayname", { length: 256 }),
});

export const insertUserSchema = z.object({
	email: z.string()
	.email({ message: "Please enter a valid email" }),
	displayname: z.string()
	.min(1, { message: "You need to enter a displayname" })
	.max(256, { message: "Displayname can't be more than 256 characters" }),
	password: z.string()
	.min(6, "Password needs to be atleast 6 characthers. ")
	.max(64, "Password cant be more than 64 characthers. ")
	.regex(/[A-Z]/, { message: "Password must include uppercase letter. " })
	.regex(/[a-z]/, { message: "Password must include lowercase letter. " })
	.regex(/[0-9]/, { message: "Password must include number. " }),
});

export const signinSchema = z.object({
	email: z.string()
	.email({ message: "Please enter a valid email" }),
	password: z.string()
	.min(1, { message: "You need to enter a password" })
});

export const key = mysqlTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const session = mysqlTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const contactSchema = z.object({
	email: z.string()
	.email({ message: "Please enter a valid email" }),
	name: z.string()
	.min(1, "Please enter your name")
	.max(64, "Your name is to long"),
	message: z.string()
	.min(1, "Please enter a message")
	.max(200, "Message cant be more than 200 characthers"),
});

export const contact = mysqlTable("contact", {
	id: bigint("id", { mode: "number" })
	.primaryKey()
	.autoincrement(),
	name: varchar("name", { length: 64 })
	.notNull(),
	email: varchar("email", { length: 64 })
	.notNull(),
	message: varchar("message", { length: 200 })
	.notNull(),
});

export const project = mysqlTable("project", {
	id: bigint("id", { mode: "number" })
	.primaryKey()
	.autoincrement(),
	name: varchar("name", { length: 64 })
	.notNull(),
	description: varchar("description", { length: 150 }),
	usage: json("usage")
	.notNull(),
	secret: varchar("secret", { length: 255 })
	.notNull()
});

export const apikey = mysqlTable("apikey", {
	key: varchar("key", { length: 255 })
	.notNull(),
	name: varchar("name", { length: 64 }),
	project_id: bigint("project_id", { mode: "number" })
	.references(() => project.id),
});

export const insertApikeySchema = z.string().min(1, "An api key name is requierd").max(64, "Api key names cant be more than 64 characthers long");

export const team = mysqlTable("team", {
	id: bigint("id", { mode: "number" })
	.primaryKey()
	.autoincrement(),
	name: varchar("name", { length: 64 })
	.notNull(),
	description: varchar("description", { length: 150 }),
});

export const user_to_project = mysqlTable("user_to_project", {
	user_id: varchar("user_id", { length: 256 })
	.notNull()
	.references(() => user.id),
	project_id: bigint("project_id", { mode: "number" })
	.notNull()
	.references(() => project.id, { onDelete: "cascade" }),
});

export const user_to_team = mysqlTable("user_to_team", {
	user_id: varchar("user_id", { length: 256 })
	.notNull()
	.references(() => user.id),
	team_id: bigint("team_id", { mode: "number" })
	.notNull()
	.references(() => team.id, { onDelete: "cascade" }),
});

export const team_to_project = mysqlTable("team_to_project", {
	team_id: bigint("team_id", { mode: "number" })
	.notNull()
	.references(() => team.id, { onDelete: "cascade" }),
	project_id: bigint("project_id", { mode: "number" })
	.notNull()
	.references(() => project.id, { onDelete: "cascade" }),
});

export const insertProjectOrTeamSchema = z.object({
	name: z.string()
	.min(1, "You need to enter a name")
	.max(64, "Name can't be more than 64 characthers"),
	description: z.string()
	.max(150, "Description can't be more than 150 characthers"),
});