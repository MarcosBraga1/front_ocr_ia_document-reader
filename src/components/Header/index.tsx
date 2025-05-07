import Link from "next/link";

export function Header() {
    return (
        <nav className="bg-zinc-950 text-white flex items-center justify-between px-8 py-4 shadow-md">
            <Link href="/" className="text-xl font-semibold hover:text-indigo-600 transition-colors">
                Sistema OCR
            </Link>

            <Link
                href="/dashboard"
                className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
                Ir para o Dashboard
            </Link>
        </nav>
    );
}
