import { logout } from "@/actions/user/logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/ui/theme-switcher"
import { getUser } from "@/data/user"
import Link from "next/link"

export default async function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = await getUser();

    return (
        <>
            <div className="sticky top-0 border-b border-border bg-background/80 backdrop-blur-sm z-40">
                <nav className="mx-auto max-w-full w-[1440px] px-8 h-20 flex items-center">
                    <div className="flex items-center">
                        <Link href="/home" className="text-3xl font-bold tracking-tight mr-8">Rester</Link>
                        <Button asChild variant="ghost" className="mr-2">
                            <Link href="/docs">Docs</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/contact">Contact us</Link>
                        </Button>
                    </div>

                    <div className="ml-auto flex gap-2 items-center justify-center">
                        {
                            !user ? 
                            <>
                                <Button asChild variant="outline">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup">Sign up</Link>
                                </Button>
                            </>
                            :
                            <>
                                <Button asChild><Link href="/dashboard">Dashboard</Link></Button>
                                <form action=""><Button formAction={logout} variant="ghost">Logout</Button></form>
                                <Avatar>
                                    <AvatarImage src="/user-128.png" alt="" loading="eager" />
                                    <AvatarFallback>{ user.displayname }</AvatarFallback>
                                </Avatar>
                            </>
                        }
                    </div>
                </nav>
            </div>

            {children}

            <footer className="mt-12 sticky top-full left-0 right-0 border-t border-border bg-muted">
                <div className="mx-auto max-w-full w-[1024px] px-6 pt-8 pb-4 grid md:grid-cols-4 gap-5">
                    <div>
                        <h2 className="text-2xl font-bold">Rester</h2>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold">Explore</h3>
                        <ul className="mt-1">
                            <li>
                                <Link href="/docs" className="text-blue-two underline-offset-4 hover:underline text-sm font-medium">Documentation</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-bold">About us</h3>
                        <ul className="mt-1">
                            <li>
                                <Link href="/gdpr" className="text-blue-two underline-offset-4 hover:underline text-sm font-medium">GDPR compliance</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="place-self-end hidden md:block">
                        <ThemeSwitcher />
                    </div>
                </div>
            </footer>
        </>
        
    )
}