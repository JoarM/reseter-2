import { db } from "@/server/db";
import { auth } from "@/server/lucia";
import { project, team_to_project, user_to_project, user_to_team } from "@/server/schema";
import { or, sql } from "drizzle-orm";
import * as context from "next/headers";
import { getUnsanitizedUser } from "./user";

export async function getProjects() {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const projects = db.select()
    .from(project)
    .where(
        or(
            sql`${project.id} IN (
            SELECT ${user_to_project.project_id} FROM ${user_to_project} WHERE ${user_to_project.user_id} = ${user.userId}
            )`,
            sql`${project.id} IN (
                SELECT ${team_to_project.project_id} FROM ${team_to_project} WHERE ${team_to_project.team_id} IN (
                    SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId}
                )
            )`
        )
    );

    return projects;
}

export function getProject(id: string) {
    
}