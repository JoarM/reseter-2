"use server";

import { db } from "@/server/db";
import { team, user_to_team } from "@/server/schema";
import { sql } from "drizzle-orm";
import { getUnsanitizedUser } from "./user";

export async function getTeams() {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const teams = db.select()
    .from(team)
    .where(sql`${team.id} in (select ${user_to_team.team_id} from ${user_to_team} where ${user_to_team.user_id} = ${user.userId})`);

    return teams;
}