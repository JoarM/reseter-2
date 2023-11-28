"use server";

export function signup(formData: FormData) {
    const username = formData.get("name");
    const email = formData.get("mail");
    const password = formData.get("password");
}