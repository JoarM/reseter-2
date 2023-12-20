import LoginForm from "@/components/forms/login-form";
import { redirectLoggedInUser } from "@/data/user";

export default async function Login() {
    await redirectLoggedInUser();

    return (
        <div className="px-4">
            <LoginForm />
        </div>
    )
}