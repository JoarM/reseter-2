"use server";

import { db } from "@/server/db";
import { project, team, team_to_project, user_to_team, user as dbUser } from "@/server/schema";
import { and, eq, sql } from "drizzle-orm";
import { getUnsanitizedUser } from "./user";

export async function getTeams() {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const teams = await db.select()
    .from(team)
    .where(sql`${team.id} in (select ${user_to_team.team_id} from ${user_to_team} where ${user_to_team.user_id} = ${user.userId})`);

    return teams;
}

export async function getTeam(projectId: string) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(projectId);
    if (isNaN(id)) return
    
    const t = {
        usage: project.usage,
        id: team.id,
        name: team.name,
        description: team.description
    }

    const teams = await db.select({
        id: team.id,
        name: team.name,
        description: team.description,
        usage: project.usage,
        users: dbUser
    })
    .from(team)
    .where(
        and(
            sql`${team.id} in (select ${user_to_team.team_id} from ${user_to_team} where ${user_to_team.user_id} = ${user.userId})`,
            eq(team.id, id)
        )
    ).leftJoin(project, sql`${project.id} IN (
        SELECT ${team_to_project.project_id} FROM ${team_to_project} WHERE ${team_to_project.team_id} = ${id}
    )`)
    .leftJoin(dbUser, sql`${dbUser.id} IN (
        SELECT ${user_to_team.user_id} FROM ${user_to_team} WHERE ${user_to_team.team_id} = ${id}
    )`);

    return teams[0];
}