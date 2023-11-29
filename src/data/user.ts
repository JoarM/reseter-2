"use server";

import { auth } from "@/server/lucia";
import * as context from "next/headers";

export async function getUser() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    if (!session) return;
    return {
        email: session.user.email,
        displayname: session.user.displayname,
    }
}