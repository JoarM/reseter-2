"use server";

import { auth } from "@/server/lucia";
import { signinSchema } from "@/server/schema";
import { LuciaError } from "lucia";
import { redirect } from "next/navigation";
import * as context from "next/headers";

export async function login(formData: FormData) {
    const email = formData.get("mail")?.valueOf();
    const password = formData.get("password")?.valueOf();

    const parse = await signinSchema.safeParseAsync({
        email: email,
        password: password,
    });

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors;
        return {
            error
        }
    }

    if (!email || !password) return;

    try {
        const key = await auth.useKey("email", email?.toString(), password?.toString());
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });
        const authRequest = await auth.handleRequest("POST", context);
        authRequest.setSession(session);
    } catch (e) {
        if (e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
            e.message === "AUTH_INVALID_PASSWORD")) {
            return {
                error: "Incorrect email or password",
            }
        }
        return {
            error: "An unknown error occured",
        }
    }
    return redirect("/home");
}