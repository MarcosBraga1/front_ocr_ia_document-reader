import { Sidebar } from "@/components/Sidebar"

export default function Dashboard() {    
    return(
        <main className="flex h-screen max-h-screen bg-zinc-900 text-zinc-100">
            <aside className="w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col overflow-hidden">
                <Sidebar />
            </aside>
            <section className="flex flex-col flex-1 items-center overflow-hidden">
                
            </section>
        </main>
    )
}