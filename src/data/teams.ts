"use server";

import { db } from "@/server/db";
import { auth } from "@/server/lucia";
import { team, user_to_team } from "@/server/schema";
import { sql } from "drizzle-orm";
import * as context from "next/headers";

export async function getTeams() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    if (!session) return;

    const teams = db.select()
    .from(team)
    .where(sql`${team.id} in (select ${user_to_team.team_id} from ${user_to_team} where ${user_to_team.user_id} = ${session.user.userId})`);

    return teams;
}