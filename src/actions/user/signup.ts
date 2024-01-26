"use server";

import { auth } from "@/server/lucia";
import { insertUserSchema } from "@/server/schema";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
    const displayname = formData.get("name")?.valueOf();
    const email = formData.get("mail")?.valueOf();
    const password = formData.get("password")?.valueOf();

    const parse = await insertUserSchema.safeParseAsync({
        password: password,
        email: email,
        displayname: displayname
    });

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors;
        return {
            error
        }
    }

    if (email === undefined 
        || password === undefined
        || displayname === undefined
    ) {
        return {
            message: "An unexpcted error occured",
        }
    }

    try {
        const user = await auth.createUser({
            key: {
                providerId: "email",
                providerUserId: email.toString().toLowerCase(),
                password: password.toString(),
            },
            attributes: {
                displayname: displayname.toString(),
                email: email.toString()
            }
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const authRequest = auth.handleRequest("POST", context);
        authRequest.setSession(session);
    } catch (e: any) {
        if (e.code === "ER_DUP_ENTRY") {
            return {
                message: "An account with this email already exists",
            };
        }

        return {
            message: "An unknown error occurred",
        };
    }
    redirect("/dashboard");
}