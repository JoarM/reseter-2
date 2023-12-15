"use server";

import { getUnsanitizedUser, isLoggedIn } from "@/data/user";
import { randomUsage } from "@/lib/utils";
import { db } from "@/server/db";
import { insertProjectOrTeamSchema, project, team, user_to_project, user_to_team } from "@/server/schema";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function create(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) {
        return {
            message: "Unauthenticated",
        }
    }

    const type = formData.get("type")?.valueOf();
    const name = formData.get("name")?.valueOf();
    const description = formData.get("description")?.valueOf();

    const parse = await insertProjectOrTeamSchema.safeParseAsync({
        name: name,
        description: description
    });

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors;
        return {
            error
        }
    }

    if (name === undefined || description === undefined) return;

    if (type === "project") {
        try {
            const newProject = await db.insert(project)
            .values({
                name: name.toString(),
                description: description.toString(),
                usage: JSON.stringify(randomUsage()),
                secret: randomUUID(),
            });
            
            await db.insert(user_to_project)
            .values({
                user_id: user.userId,
                project_id: newProject[0].insertId
            });
        } catch (e) {
            return {
                message: "An unexpected error occured",
            }
        }
        
        revalidatePath("/dashboard");
        return {
            success: true,
        }
    } else if (type === "team") {
        try {
            const newTeam = await db.insert(team)
            .values({
                name: name.toString(),
                description: description.toString(),
            });
            
            await db.insert(user_to_team)
            .values({
                user_id: user.userId,
                team_id: newTeam[0].insertId
            });
        } catch (e) {
            return {
                message: "An unexpected error occured",
            }
        }
        
        revalidatePath("/dashboard");
        return {
            success: true,
        }
    }
    return {
        message: "Please select a valid type."
    }
}