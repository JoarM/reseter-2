"use server";

import { auth } from "@/server/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const authRequest = auth.handleRequest("POST", context);
    const session = await authRequest.validate();

    if (!session) {
        return;
    }
    
    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);

    return redirect("/home");
}