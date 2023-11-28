import { mysqlTable, bigint, varchar, unique } from "drizzle-orm/mysql-core";
import { z } from "zod";

export const user = mysqlTable("auth_user", {
	id: varchar("id", {
		length: 256
	}).primaryKey(),
	email: varchar("email", { length: 128 }).unique(),
	displayname: varchar("displayname", {
		length: 256
	}),
});

export const insertUserSchema = z.object({
	email: z.string()
	.email({ message: "Please enter a valid email" }),
	displayname: z.string()
	.min(1, { message: "You need to enter a displayname" })
	.max(256, { message: "Displayname can't be more than 256 characters" }),
	password: z.string()
	.min(6, "Password needs to be atleast 6 characthers")
	.max(64, "Password cant be more than 64 characthers")
	.regex(/[A-Z]/, { message: "Password must include uppercase letter" })
	.regex(/[a-z]/, { message: "Password must include lowercase letter" })
	.regex(/[0-9]/, { message: "Password must include number" }),
});

export const signinSchema = z.object({
	email: z.string()
	.min(1),
	password: z.string()
	.min(1)
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
