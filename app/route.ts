import { isLoggedIn } from "@/data/user";
import { redirect } from "next/navigation";

export async function GET() {
    if ((await isLoggedIn())) {
        return redirect("/dashboard");
    }
    return redirect("/home");
}