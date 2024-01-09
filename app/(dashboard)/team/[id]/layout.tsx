import { getTeam } from "@/data/teams";
import { notFound } from "next/navigation";

export default async function TeamLayout(props: {
    children: React.ReactNode, 
    modal: React.ReactNode,
    params: {
        id: string,
    }
}) {
    return (
        <>
            <main className="mx-auto max-w-3xl w-full px-6 pb-12 pt-14">
                {props.children}
            </main>
            {props.modal}
        </>
    )
}