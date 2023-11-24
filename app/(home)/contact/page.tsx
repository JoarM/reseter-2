import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
    return (
        <div className="px-4">
            <h1 className="font-bold lg:text-5xl text-4xl text-center mt-14 ">Get in touch</h1>
            <p className="font-medium lg:text-4xl text-2xl text-muted-foreground text-center max-w-lg mx-auto">Talk to our sales team to get the right pricing for you</p>
            <form className="border border-border rounded-xl max-w-lg mx-auto mt-8 px-6 py-8">
                <Label htmlFor="email" className="block">Email</Label>
                <Input className="mt-2" name="email" id="email" />

                <Label className="mt-4 block" htmlFor="name">Name</Label>
                <Input className="mt-2" name="name" id="name" />

                <Label className="mt-4 block">Your message</Label>
                <Textarea className="mt-2 resize-none" rows={4} />

                <Button className="mt-5">Send message</Button>
            </form>
        </div>
    )
}