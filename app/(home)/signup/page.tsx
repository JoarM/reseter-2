import SignupForm from "@/components/forms/signup-form";
import { redirectLoggedInUser } from "@/data/user";

export default async function Signup() {
    await redirectLoggedInUser();

    return (
        <div className="px-4">
            <SignupForm />
        </div>
    )
}