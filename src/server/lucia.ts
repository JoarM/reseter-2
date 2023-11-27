import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import { poolConnection } from "./db";

export const auth = lucia({
	adapter: mysql2(poolConnection, {
        user: "auth_user",
        session: "user_session",
        key: "user_key",
    }),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs_future(),

	sessionCookie: {
		expires: false
	}
});

export type Auth = typeof auth;