import ContactForm from "@/components/utils/contact-form";

export default function Contact() {
    return (
        <div className="px-4">
            <h1 className="font-bold lg:text-5xl text-4xl text-center mt-14 ">Get in touch</h1>
            <p className="font-medium lg:text-4xl text-2xl text-muted-foreground text-center max-w-lg mx-auto">Talk to our sales team to get the right pricing for you</p>
            <ContactForm />
        </div>
    )
}