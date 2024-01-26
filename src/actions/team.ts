"use server";

import { getUnsanitizedUser } from "@/data/user";
import { db } from "@/server/db";
import { insertProjectOrTeamSchema, team, team_to_project, user_to_team, user as dbUser, invites } from "@/server/schema";
import { render } from "@react-email/render";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import InviteUserEmail from "../../emails/invite";
import { createTransport } from "nodemailer";
import { getTeam } from "@/data/teams";
import { headers } from "next/headers";

export async function getIp() {
    const forwardedFor = headers().get('x-forwarded-for');
    const realIp = headers().get('x-real-ip');

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    if (realIp) return realIp.trim();
    
    return undefined;
}

export async function editTeam(prevState: any, formData: FormData) {
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
        await db.update(team)
        .set({
            name: name.toString(),
            description: description.toString()
        }).where(
            and(
                eq(team.id, id), 
                sql`${id} IN (SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId})`,
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

export async function deleteTeam(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(formData.get("id")?.valueOf());
    if (isNaN(id)) return;

    try {
        await db.delete(team).where(
            and(
                eq(team.id, id), 
                sql`${id} IN (SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId})`,
            )
        );
    } catch (e) {
        return {
            message: "An unexpected error occured please try again"
        }
    }
    revalidatePath("/dashboard");
    return redirect("/dashboard");
}

export async function addProject(formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(formData.get("id")?.valueOf());
    const projectId = Number(formData.get("projectId")?.valueOf());
    if (isNaN(projectId) || isNaN(id)) return;

    try {
        await db.insert(team_to_project)
        .values({
            project_id: projectId,
            team_id: id,
        });
    } catch(e) {
        return {
            error: "An unkown error occured",
        }
    }
    revalidatePath(`/team/${id}/edit/projects`);
}

export async function removeProject(formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return;

    const id = Number(formData.get("id")?.valueOf());
    const projectId = Number(formData.get("projectId")?.valueOf());
    if (isNaN(projectId) || isNaN(id)) return;

    try {
        await db
        .delete(team_to_project)
        .where(
            and(
                eq(team_to_project.project_id, projectId),
                eq(team_to_project.team_id, id),
                sql`${id} IN (SELECT ${user_to_team.team_id} FROM ${user_to_team} WHERE ${user_to_team.user_id} = ${user.userId})`,
            )
        );
    } catch(e) {
        return {
            error: "An unkown error occured",
        }
    }
    revalidatePath(`/team/${id}/edit/projects`);
}

export async function inviteMember(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return {
        error: "You need to be logged in.",
    };

    const email = formData.get("email")?.toString();
    const id = formData.get("id")?.toString();
    const intId = Number(id);
    if (!email || !id || email === user.email || isNaN(intId)) return {
        error: "Invalid params, please try again"
    };

    const invite = await db.select()
    .from(dbUser)
    .where(eq(dbUser.email, email));
    if (invite.length <= 0) return {
        error: "User with specified email dosent exist"
    };

    const team = await getTeam(id);
    if (!team) return;

    const host = headers().get("host");
    if (!host) return {
        error: "An unexpected error occured please try again"
    };
    const link = `${host}/invites/team/${id}`;

    try {

        await db.insert(invites)
        .values({
            team_id: intId,
            user_id: invite[0].id
        });
    } catch (e) {
        return {
            error: "An unexpected error occured",
        }
    }

    const smtpUser = process.env.smtpUser;
    const smtpPassword = process.env.smtpPassword;
    if (!smtpUser || !smtpPassword) return {
        error: "An unexpected error occured"
    };

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
    });

    const geo = await (await fetch(`http://ip-api.com/json/62.20.62.210`)).json();
    const location = geo.success ? `${geo.city}, ${geo.country}` : "Unknown";
    const emailHtml = render(InviteUserEmail({
        invitedByEmail: user.email as string,
        invitedByUsername: user.displayname as string,
        username: invite[0].displayname as string,
        teamName: team.name,
        inviteFromIp: await getIp(),
        inviteFromLocation: location,
        inviteLink: link,
    }));

    const options = {
        from: smtpUser,
        to: email,
        subject: `Join ${user.displayname} on Rester`,
        html: emailHtml,
    };
      
    await transporter.sendMail(options);

    return {
        success: `Invite sent to ${invite[0].displayname}`,
    };
}

export async function joinTeam(prevState: any, formData: FormData) {
    const user = await getUnsanitizedUser();
    if (!user) return {
        error: "You need to be logged in for this"
    };

    const id = Number(formData.get("id")?.valueOf());
    if (isNaN(id)) return {
        error: "Error invalid params, please try again"
    };

    const invite = await db.select()
    .from(invites)
    .where(
        and(
            eq(invites.team_id, id),
            eq(invites.user_id, user.userId)
        )
    );

    if (!invite[0]) return {
        error: "You dont have access to joining this team"
    };

    try {
        await db.insert(user_to_team)
        .values({
            team_id: id,
            user_id: user.userId
        });
        await db.delete(invites)
        .where(and(
            eq(invites.team_id, id),
            eq(invites.user_id, user.id)
        ));
    } catch (e) {
        return {
            error: "An unexpected error occured"
        }
    }
    redirect(`/team/${id}`);
}