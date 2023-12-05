"use server";

import { contactSchema } from "@/server/schema";
import { db } from "@/server/db";
import { contact as dbContact } from "@/server/schema";
import { isLoggedIn } from "@/data/user";


export async function contact(prevState: any, formData: FormData) {
    if (!(await isLoggedIn())) {
        return {
            message: "You need to be logged in to send a message"
        }
    }

    const email = formData.get("email")?.valueOf();
    const name = formData.get("name")?.valueOf();
    const message = formData.get("message")?.valueOf();

    const parse = await contactSchema.safeParseAsync({
        email: email,
        name: name,
        message: message
    });

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors;
        return {
            error
        }
    }

    try {
        await db.insert(dbContact).values({
            name: name?.toString(),
            email: email?.toString(),
            message: message?.toString(),
        });
    } catch (e) {
        return {
            message: "An unexpected error occured",
        }
    }

    return {
        success: true,
    }
}