import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
            <div className="sticky top-0 border-b border-border">
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
                </nav>
            </div>

            {children}
        </>
        
    )
}