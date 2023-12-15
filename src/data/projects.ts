"use server";

import { db } from "@/server/db";
import { project as projectDb, team_to_project, user_to_project, user_to_team } from "@/server/schema";
import { and, eq, or, sql } from "drizzle-orm";
import { getUnsanitizedUser } from "./user";

export async function getProjects() {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const projects = db.select()
    .from(projectDb)
    .where(
        or(
            sql`${projectDb.id} IN (
            SELECT ${user_to_project.project_id} FROM ${user_to_project} WHERE ${user_to_project.user_id} = ${user.userId}
            )`,
            sql`${projectDb.id} IN (
                SELECT ${team_to_project.project_id} FROM ${team_to_project} WHERE ${team_to_project.team_id} IN (
                    SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId}
                )
            )`
        )
    );

    return projects;
}

export async function getProject(id: string) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const intId = Number(id);

    const project = await db.select()
    .from(projectDb)
    .where(
        and(
            eq(projectDb.id, intId), 
            sql`${intId} IN (SELECT ${user_to_project.project_id} FROM ${user_to_project} WHERE ${user_to_project.user_id} = ${user.userId})`
        )
    );
    return project[0];
}