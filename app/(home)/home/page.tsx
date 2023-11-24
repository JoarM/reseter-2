import { Button } from "@/components/ui/button";
import { KeyRound, Mail, Send, Server } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-[1024px] max-w-full px-6 mx-auto">
            <header className="grid place-items-center mt-44">
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-two text-center">Reset passwords with ease</h1>
                <p className=" text-center md:px-20 text-base lg:text-xl ">We handle all the heavy lifting of resetting passwords so you can move fast with confidence. all while staying fully GDPR compliant</p>
                <div className=" grid gap-2 sm:grid-cols-2 mt-2">
                    <Button asChild variant="outline" className="w-72 max-w-full">
                        <Link href="/signup">Start now</Link>
                    </Button>
                    <Button asChild className="w-72 max-w-full">
                        <Link href="/contact">Contact us</Link>
                    </Button>
                </div>
            </header>

            <main>
                <h2 className="font-bold text-blue-two text-3xl lg:text-4xl text-center mt-48">Password resets made easy</h2>
                <p className="md:px-20 text-center">Integrtate password resets in as little as 10 lines of code, dont belive it? Its true take a look at how we make it possible below</p>

                <div className="grid place-items-center mt-16">
                    <span className="bg-blue-three rounded-full w-8 h-8 flex items-center justify-center text-background relative mt-20
                     before:absolute before:h-20 before:bg-gradient-to-b before:from-transparent before:to-blue-three before:w-[2px] before:bottom-full">1</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-blue-two text-center mt-5">Make a reset request</h3>
                    <div className="grid md:grid-cols-2 gap-12 w-full mt-4" aria-disabled>
                        <div className="aspect-video rounded-lg border border-border w-full" aria-disabled>
                            <div className="h-6 border-b border-border flex gap-2 items-center justify-end px-3" aria-disabled>
                                <span className="rounded-full h-3 w-3 bg-green-500" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-yellow-300" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-red-600" aria-disabled></span>
                            </div>
                            <span aria-disabled className="px-3 text-muted-foreground text-sm block mt-1">1 const rester = getRester(api-key, api-secret);</span>
                            <span aria-disabled className="px-3 text-muted-foreground text-sm block">2 reseter.sendReset.(email, user-id);</span>
                        </div>

                        <div>
                            <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                                <Server size={24} />
                            </div>
                            <h4 className="text-lg font-bold mt-1">Initialize Reseter</h4>
                            <p className="text-muted-foreground text-sm font-medium mt-1">Create a Reseter instance in your app with by initializing it with your api-key and secret</p>

                            <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center mt-5">
                                <Send size={24} />
                            </div>
                            <h4 className="text-lg font-bold mt-1">Send a reset request</h4>
                            <p className="text-muted-foreground text-sm font-medium mt-1">Send a reset request by providing an email and user or other unique identifying string, if nothing is provided here the email will be used in its place.</p>
                        </div>
                    </div>
                </div>

                <div className="grid place-items-center mt-16">
                    <span className="bg-blue-three rounded-full w-8 h-8 flex items-center justify-center text-background relative mt-20
                     before:absolute before:h-20 before:bg-gradient-to-b before:from-transparent before:to-blue-three before:w-[2px] before:bottom-full">2</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-blue-two text-center mt-5">User receives reset code</h3>
                    <div className="grid md:grid-cols-2 gap-12 w-full mt-4" aria-disabled>
                        <div>
                            <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                                <Mail size={24} />
                            </div>
                            <h4 className="text-lg font-bold mt-1">Reset code is sent via email</h4>
                            <p className="text-muted-foreground text-sm font-medium mt-1">The user gets their unique reset code sent to their email.</p>
                        </div>
                        
                        <div className="aspect-video rounded-lg border border-border w-full" aria-disabled>
                            <div className="h-6 border-b border-border flex gap-2 items-center justify-end px-3" aria-disabled>
                                <span className="rounded-full h-3 w-3 bg-green-500" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-yellow-300" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-red-600" aria-disabled></span>
                            </div>
                            <span aria-disabled className="px-3 text-lg block mt-1">Reset password</span>
                            <div className="grid place-items-center">
                                <span className="bg-muted mt-6 px-12 py-2 rounded-sm">8  6  2  7  5  7</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid place-items-center mt-16">
                    <span className="bg-blue-three rounded-full w-8 h-8 flex items-center justify-center text-background relative mt-20
                     before:absolute before:h-20 before:bg-gradient-to-b before:from-transparent before:to-blue-three before:w-[2px] before:bottom-full">3</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-blue-two text-center mt-5">Reset the password</h3>
                    <div className="grid md:grid-cols-2 gap-12 w-full mt-4" aria-disabled>
                        <div className="aspect-video rounded-lg border border-border w-full" aria-disabled>
                            <div className="h-6 border-b border-border flex gap-2 items-center justify-end px-3" aria-disabled>
                                <span className="rounded-full h-3 w-3 bg-green-500" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-yellow-300" aria-disabled></span>
                                <span className="rounded-full h-3 w-3 bg-red-600" aria-disabled></span>
                            </div>
                            <span aria-disabled className="px-3 text-muted-foreground text-sm block mt-1">1 reseter.getUser.(reset-token);</span>
                            <span aria-disabled className="px-3 text-muted-foreground text-sm block">2 //Reset password</span>
                        </div>

                        <div>
                            <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                                <KeyRound size={24} />
                            </div>
                            <h4 className="text-lg font-bold mt-1">Change the password</h4>
                            <p className="text-muted-foreground text-sm font-medium mt-1">Get the user information from by passing in the reset token, use the data provided to change the users password.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}