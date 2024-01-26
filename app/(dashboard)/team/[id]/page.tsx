import { CostChart } from "@/components/client/cost-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTeam } from "@/data/teams";
import { getUser } from "@/data/user";
import { getPriceMultiplier, priceFormatter } from "@/lib/utils";
import { Folder, Plus, Settings, UserX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Team({
    params
}: {
    params: {
        id: string;
    }
}) {
    const team = await getTeam(params.id);
    const user = await getUser();

    if (!team) {
        return notFound();
    }

    let rawUsage = [0, 0, 0, 0, 0, 0, 0];
    let price:any[] = [];
    let usageSum = 0;
    if (team.projects.length > 0) {
        usageSum = team.projects.reduce((prev, next) => prev + JSON.parse(next.usage).reduce((a: any, b: any) => a + b, 0), 0);
        for (let i = 0; i < team.projects.length; i++) {
            for (let j = 0; j < JSON.parse(team.projects[i].usage).length; j++) {
                rawUsage[j] = rawUsage[j] + JSON.parse(team.projects[i].usage)[j];
            }
        }
    }
    const sum = usageSum * getPriceMultiplier(usageSum);
    

    for (let i = 0; i < rawUsage.length; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formatedDate = date.toLocaleDateString("en-uk", {
            month: "short",
            day: "numeric",
        });
        const longDate = date.toLocaleDateString("en-uk", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        price.unshift({
            date: formatedDate,
            tooltip: longDate,
            "cost": rawUsage[i] * getPriceMultiplier(rawUsage[i]),
        });
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-4xl font-bold">{team.name}</h1>
                <Link href={`/team/${params.id}/edit`} className="group ml-4">
                    <Settings
                    className="group-hover:rotate-180 transition-transform ease-in duration-300"
                    size={32}
                    />
                    <span className="sr-only">Edit</span>
                </Link>
            </div>

            <Card className="mt-6 shadow-md">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Cost</CardTitle>
                    <span className="font-medium text-lg text-foreground">{priceFormatter.format(sum)}</span>
                </CardHeader>
                <CardContent>
                    <CostChart 
                    cost={price}
                    />

                    <noscript>
                        <span className="text-sm font-medium">Enable Javascript to see chart</span>
                        <ul className="divide-y divide-border/50">
                            {price.map((obj) => 
                                <li key={obj.date} className="py-2">
                                    <div className="text-xs font-normal text-muted-foreground">{obj.tooltip}</div>
                                    <div className="text-sm font-medium mt-1">Cost: <span className="text-primary">{priceFormatter.format(obj.cost)}</span></div>
                                </li>
                            )}
                        </ul>
                    </noscript>
                </CardContent>
            </Card>
            
            <Card className="mt-6 shadow-md h-[25rem]">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Projects</CardTitle>
                    <Button asChild>
                        <Link href={`/team/${params.id}/edit/projects`}>
                            <Folder
                            size={16}
                            className="sm:mr-2"
                            />
                            <span className="sm:inline hidden">Manage projects</span>
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                    {
                        team.projects.length > 0 ? <>
                            {team.projects.map((project) => {
                                return (
                                    <Link href={`/project/${project.id}`} key={project.id} className="group outline-none hover:scale-105 transition-transform ease-in">
                                        <Card className="h-40 group-hover:border-foreground group-hover:bg-muted/25 group-focus-visible:ring-2 ring-offset-2 ring-offset-background ring-foreground transition-colors">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">{project.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <span className="text-sm font-light">{project.description}</span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </>
                        :
                        <p>No projects in this team</p>
                    }
                </CardContent>
            </Card>

            <Card className="mt-6 shadow-md h-[25rem]">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Members</CardTitle>
                    <Button asChild>
                        <Link href={`/team/${params.id}/add/member`}>
                            <Plus
                            size={16}
                            className="sm:mr-2"
                            />
                            <span className="sm:inline hidden">Invite member</span>
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {team.users.map(users => {
                                return (
                                    <TableRow key={users.email} className="h-20">
                                        <TableCell>{users.name}</TableCell>
                                        <TableCell>{users.email}</TableCell>
                                        <TableCell>
                                            {user?.email != users.email && 
                                                <form action="" className="flex">
                                                    <Button size="icon" variant="destructive" className="ml-auto">
                                                        <UserX
                                                        size={16}
                                                        />
                                                        <span className="sr-only">Remove user</span>
                                                    </Button>
                                                    <input type="hidden" value={users.email} />
                                                    <input type="hidden" value={params.id} />
                                                </form>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}