import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-[1024px] max-w-full px-6 mx-auto">
            <header className="grid place-items-center mt-56">
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-two text-center">Reset passwords with ease</h1>
                <p className=" text-center px-20 text-base lg:text-xl ">We handle all the heavy lifting of resetting passwords so you can move fast with confidence. all while staying fully GDPR compliant</p>
                <div className=" space-x-2 mt-2">
                    <Button asChild variant="outline" className="w-72">
                        <Link href="/signup">Start now</Link>
                    </Button>
                    <Button asChild className="w-72">
                        <Link href="/contact">Contact us</Link>
                    </Button>
                </div>
            </header>

            <main>
                
            </main>
        </div>
    )
}