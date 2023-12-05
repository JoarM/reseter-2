import LoginForm from "@/components/utils/login-form";
import { redirectLoggedInUser } from "@/data/user";

export default async function Login() {
    await redirectLoggedInUser();

    return (
        <div className="px-4">
            <LoginForm />
        </div>
    )
}