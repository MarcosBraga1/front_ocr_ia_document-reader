'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Conversation {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export function Sidebar() {
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/conversation/',
                    {
                        method: 'GET',
                        credentials: 'include'
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'conversations search failed');
                }

                const data = await response.json();
                setConversation(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchConversations();
    }, []);

    const handleCreateConversation = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:8000/conversation',
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'conversation creation failed');
            }

            const data = await response.json();

            console.log('conversation created', data.conversationId)
            router.push(`/dashboard/${data.conversationId}`)


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-zinc-900 flex flex-col w-64 h-screen border-r border-zinc-800">
            <div className="py-5 px-4 border-b border-zinc-800">
                <h2 className="text-xl font-semibold text-zinc-100 text-center">Conversas</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                    {conversation.map((conv) => (
                        <Link
                            key={conv.id}
                            href={`/dashboard/${conv.id}`}
                            className="px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-b border-zinc-800"
                        >
                            Conversa #{conv.id}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-zinc-800">
                <div className="pr-4">
                    <button
                        onClick={handleCreateConversation}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md shadow transition-colors"
                    >
                        Nova conversa
                    </button>
                </div>
            </div>

        </div>
    )
}