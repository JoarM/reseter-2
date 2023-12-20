"use server";

import { getUnsanitizedUser } from "@/data/user";
import { db } from "@/server/db";
import { insertProjectOrTeamSchema, project, team_to_project, user_to_project, user_to_team } from "@/server/schema";
import { and, eq, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editProject(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(formData.get("id")?.valueOf());
    if (isNaN(id)) return;

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

    try {
        await db.update(project)
        .set({
            name: name.toString(),
            description: description.toString()
        }).where(
            and(
                eq(project.id, id), 
                or(
                    sql`${id} IN (SELECT ${user_to_project.project_id} FROM ${user_to_project} WHERE ${user_to_project.user_id} = ${user.userId})`,
                    sql`${id} IN (
                        SELECT ${team_to_project.project_id} FROM ${team_to_project} WHERE ${team_to_project.team_id} IN (
                            SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId}
                        )
                    )`
                )
            )
        );
    } catch (e) {
        return {
            message: "An unexpected error occured please try again"
        }
    }
    revalidatePath(`/dashboard/${id}`);
    return {
        success: true,
    }
}

export async function deleteProject(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(formData.get("id")?.valueOf());
    if (isNaN(id)) return;

    try {
        await db.delete(project).where(
            and(
                eq(project.id, id), 
                or(
                    sql`${id} IN (SELECT ${user_to_project.project_id} FROM ${user_to_project} WHERE ${user_to_project.user_id} = ${user.userId})`,
                    sql`${id} IN (
                        SELECT ${team_to_project.project_id} FROM ${team_to_project} WHERE ${team_to_project.team_id} IN (
                            SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId}
                        )
                    )`
                )
            )
        );
    } catch (e) {
        return {
            message: "An unexpected error occured please try again"
        }
    }
    return redirect("/dashboard");
}