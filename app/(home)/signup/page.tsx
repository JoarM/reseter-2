import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
    return (
        <div className="px-4">
            <form className="mx-auto sm:px-16 px-8 py-16 rounded-2xl border border-border max-w-lg mt-16">
                <h1 className="font-bold text-2xl">Sign up</h1>

                <Label className="mt-4 block" htmlFor="name">Display name</Label>
                <Input className="mt-2" id="name" name="name" />

                <Label className="mt-4 block" htmlFor="mail">Email</Label>
                <Input className="mt-2" id="mail" name="mail" />

                <Label className="mt-4 block" htmlFor="password">Password</Label>
                <Input className="mt-2" type="password" id="password" name="password" />

                <div className="mt-4 flex gap-2 items-center">
                    <Checkbox id="show-password" />
                    <Label htmlFor="show-password" className="font-light">Show password</Label>
                </div>
                
                <Button className="mt-6 w-full">Sign up</Button>

                <span className="font-medium text-sm block mt-3">
                    Have an account? <Link href="/reset-password" className="font-medium text-sm text-primary underline-offset-4 hover:underline">Login</Link>
                </span>
            </form>
        </div>
    )
}