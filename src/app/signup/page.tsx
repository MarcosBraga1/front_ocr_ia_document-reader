'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Header } from "@/components/Header";

export default function Singup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            const response = await fetch(
                'https://ocr-ia-document-reader.onrender.com/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ name, username, email, password })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'singup failed');
            }

            const data = await response.json();

            if (data.success) {
                console.log('user authenticated');
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="flex flex-col h-screen bg-zinc-900 text-zinc-100">
            <Header />

            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-zinc-800 rounded-xl shadow-lg p-10 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Cadastre-se no sistema</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Usuário</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Senha</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2"
                            />
                            Mostrar senha
                        </label>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors"
                        >
                            Criar conta
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Já possui uma conta?{' '}
                        <Link href="/signin" className="text-blue-400 hover:underline">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}