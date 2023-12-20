import { ProjectsAndTeams } from "@/components/client/projects-and-teams";
import { getProjects } from "@/data/projects";
import { getTeams } from "@/data/teams";

export default async function Dashboard() {
    const projects = await getProjects();
    const teams = await getTeams();

    return (
        <ProjectsAndTeams 
        projects={projects} 
        teams={teams}
        />
    )
}