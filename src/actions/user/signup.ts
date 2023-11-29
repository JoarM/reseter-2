"use server";

import { auth } from "@/server/lucia";
import { insertUserSchema } from "@/server/schema";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
    const displayname = formData.get("name")?.valueOf();
    const email = formData.get("mail")?.valueOf();
    const password = formData.get("password")?.valueOf();

    const parse = await insertUserSchema.safeParseAsync({
        password: password,
        email: email,
        displayname: displayname
    });

    if (!parse.success) {
        return {
            success: false,
            error: "I will fix message",
        }
    }

    if (email === undefined 
        || password === undefined
        || displayname === undefined
    ) {
        return {
            success: false,
            error: "An unexpcted error occured",
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
        console.log(e);
        if (e.code === "ER_DUP_ENTRY") {
            return {
                success: false,
                error: "An account with this email already exists",
            };
        }

        return {
            success: false,
            error: "An unknown error occurred",
        };
    }
    redirect("/home");
}