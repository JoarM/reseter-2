export default async function DashboardLayout(props: {children: React.ReactNode, modal: React.ReactNode}) {

    return (
        <>
            <main className="w-[1070px] max-w-full mx-auto px-6 pb-12">
                {props.children}
            </main>
            {props.modal}
        </>
    )
} 