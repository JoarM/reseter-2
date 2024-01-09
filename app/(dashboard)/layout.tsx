import { logout } from "@/actions/user/logout";
import { Button } from "@/components/ui/button";
import { getUser, isLoggedIn } from "@/data/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    if (!(await isLoggedIn())) {
        redirect("/login");
    }
    const user = await getUser();
    if (!user) return;

    return (
        <>
            <div className="sticky top-0 border-b border-border bg-muted z-40">
                <nav className="mx-auto max-w-full w-[1440px] px-8 h-20 flex items-center">
                    <div className="flex items-center">
                        <Link href="/home" className="text-3xl font-bold tracking-tight mr-8">Reseter</Link>
                        <Button asChild variant="ghost" className="mr-2">
                            <Link href="/docs">Docs</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/contact">Contact us</Link>
                        </Button>
                    </div>

                    <div className="ml-auto flex gap-2 items-center justify-center">
                        <Button asChild><Link href="/dashboard">Dashboard</Link></Button>
                        <form action=""><Button formAction={logout} variant="secondary">Logout</Button></form>
                        <Avatar>
                            <AvatarImage src="/user-128.png" alt="" loading="eager" />
                            <AvatarFallback>{ user.displayname }</AvatarFallback>
                        </Avatar>
                    </div>
                </nav>
            </div>

            {children}
        </>
    )
} 