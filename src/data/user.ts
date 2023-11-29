"use server";

import { auth } from "@/server/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    if (!session) return;
    return {
        email: session.user.email,
        displayname: session.user.displayname,
    }
}

export async function isLoggedIn() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    return !!session;
}

export async function redirectLoggedInUser() {
    if ((await isLoggedIn())) redirect("/dashboard");
}