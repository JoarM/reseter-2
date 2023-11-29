import { login } from "@/actions/user/login";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
    return (
        <div className="px-4">
            <form action={login} className="mx-auto sm:px-16 px-8 py-28 rounded-2xl border border-border max-w-lg mt-16">
                <h1 className="font-bold text-2xl">Login</h1>

                <Label className="mt-4 block" htmlFor="mail">Email</Label>
                <Input className="mt-2" id="mail" name="mail" />

                <Label className="mt-4 block" htmlFor="password">Password</Label>
                <Input className="mt-2" type="password" id="password" name="password" />

                <div className="mt-4 flex gap-2 items-center">
                    <Checkbox id="keep-logged-in" name="keep-logged-in" />
                    <Label htmlFor="keep-logged-in" className="font-light">Keep me logged in</Label>
                </div>
                
                <Button className="mt-6 w-full">Login</Button>

                <Link href="/reset-password" className="font-medium mt-3 text-sm text-primary underline-offset-4 hover:underline block">Forgot password?</Link>
            </form>
        </div>
    )
}