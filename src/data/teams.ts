"use server";

import { db } from "@/server/db";
import { project, team, team_to_project, user_to_team, user as dbUser, invites } from "@/server/schema";
import { and, eq, sql } from "drizzle-orm";
import { getUnsanitizedUser } from "./user";
import { redirect } from "next/navigation";

export async function getTeams() {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const teams = await db.select()
    .from(team)
    .where(sql`${team.id} in (select ${user_to_team.team_id} from ${user_to_team} where ${user_to_team.user_id} = ${user.userId})`);

    return teams;
}

export async function getTeam(teamId: string) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(teamId);
    if (isNaN(id)) return

    const teams = await db.select({
        id: team.id,
        name: team.name,
        description: team.description,
        project: {
            usage: project.usage,
            id: project.id,
            name: project.name,
            description: project.description
        },
        user: {
            name: dbUser.displayname,
            email: dbUser.email
        }
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

    if (!teams[0]) return redirect("/dashboard");

    const minifiedTeam = {
        name: teams[0].name,
        id: teams[0].id,
        description: teams[0].description,
        projects: minify(teams, "project", "id"),
        users: minify(teams, "user", "email"),
    }

    return minifiedTeam;
}

function minify(arr: any[], key: string, uniqueIdentifier: string) {
    let reduced: any[] = [];
    for (let i = 0; i < arr.length; i++) {
        
        (arr[i][key] && !reduced.find(el => el[uniqueIdentifier] === arr[i][key][uniqueIdentifier])) && reduced.push(arr[i][key]);
    }

    return reduced;
}

export async function invite(teamId: string) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(teamId);
    if (isNaN(id)) return

    const inviteTeam = await db.select()
    .from(team)
    .where(
        and(
            eq(team.id, id),
            sql`${team.id} in (select ${invites.team_id} from ${invites} where ${invites.user_id} = ${user.userId})`,
        )
    );
    
    if (!inviteTeam[0]) return null;
    return {
        name: inviteTeam[0].name,
    }
}