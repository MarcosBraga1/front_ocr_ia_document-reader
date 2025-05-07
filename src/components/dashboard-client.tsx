'use client'

import { Sidebar } from './Sidebar';
import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { Plus } from 'lucide-react';

interface DashboardClientProps {
    id: string;
}

interface Document {
    id: number;
    title: string;
    fileUrl: string;
    ocrText: string;
    contentType: string;
    uploadedAt: string;
}

interface Message {
    id: number;
    conversationId: number;
    sender: string;
    content: string;
    timeStamp: string;
    document?: Document;
}

export function DashboardClient({ id }: DashboardClientProps) {
    const [message, setMessage] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState('');
    const [context, setContext] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/conversation/messages?conversationId=${id}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'load messages failed');
                }

                const data = await response.json();
                setMessage(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchMessages();
        if (message.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`http://localhost:8000/ocr/upload?conversationId=${id}`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'error sending file');
            }

            const result = await response.json();
            console.log('upload complete:', result);
            setContext(result.ocrText);

            try {
                const res = await fetch(
                    `http://localhost:8000/conversation/message?conversationId=${id}`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            content: result.ocrText,
                            documentId: result.id,
                            sender: 'system',
                        }),
                    }
                );

                if (!res.ok) {
                    let errorMessage = 'create message failed';
                    try {
                        const errorData = await res.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        console.log(e)
                    }

                    throw new Error(errorMessage);
                }

                const messageResult = await res.json();
                console.log('message created:', messageResult);
                setMessage(prev => [...prev, messageResult]);
            } catch (error) {
                console.log('create message failed:', error)
            }

        } catch (error) {
            console.error('upload failed:', error);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Arquivo selecionado:', file);
            handleFileUpload(file)
        }
    };

    const downloadConversation = async (conversationId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/conversation/${conversationId}/export`, {
                method: 'GET',
                credentials: 'include',
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `conversa-${id}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt.trim()) {
            return
        }

        try {
            const res = await fetch(
                `http://localhost:8000/conversation/message?conversationId=${id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: prompt,
                        sender: 'user',
                    }),
                }
            );

            if (!res.ok) {
                let errorMessage = 'create message failed';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    console.log(e)
                }

                throw new Error(errorMessage);
            }

            const messageResult = await res.json();
            console.log('message created:', messageResult);
            setMessage(prev => [...prev, messageResult]);
        } catch (error) {
            console.log('create message failed:', error)
        }

        try {
            const response = await fetch(
                'http://localhost:8000/llm/prompt',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: prompt, context: context })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'response failed');
            }

            const data = await response.json();
            console.log('Gemini message:', data.res)
            setPrompt('');

            try {
                const res = await fetch(
                    `http://localhost:8000/conversation/message?conversationId=${id}`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            content: data.res,
                            sender: 'system',
                        }),
                    }
                );

                if (!res.ok) {
                    let errorMessage = 'create message failed';
                    try {
                        const errorData = await res.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        console.log(e)
                    }

                    throw new Error(errorMessage);
                }

                const messageResult = await res.json();
                console.log('message created:', messageResult);
                setMessage(prev => [...prev, messageResult]);
            } catch (error) {
                console.log('create message failed:', error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="flex h-screen max-h-screen bg-zinc-900 text-zinc-100">
            <aside className="w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col overflow-hidden">
                <Sidebar />
            </aside>

            <section className="flex flex-col flex-1 items-center overflow-hidden">
                <div className="w-full max-w-4xl flex-1 overflow-y-auto py-6 px-6">
                    {message.length > 0 ? (
                        <>
                            <div className="sticky top-0 z-10 bg-zinc-900 py-4 flex justify-between items-center border-b border-zinc-800 mb-6">
                                <h2 className="text-xl font-semibold">Conversa #{id}</h2>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => downloadConversation(Number(id))}
                                        aria-label="Baixar conversa"
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleButtonClick}
                                        aria-label="Adicionar documento"
                                        className="hover:text-green-400 transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf,.doc,.docx"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {message.map((mes) => (
                                    <div
                                        key={mes.id}
                                        className={`flex ${mes.sender === 'system' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`flex flex-col max-w-md px-4 py-3 rounded-md shadow ${mes.sender === 'system'
                                                ? 'bg-zinc-800 text-left'
                                                : 'bg-indigo-600 text-right text-white'
                                                }`}
                                        >
                                            {mes.document?.fileUrl && (
                                                <img
                                                    src={`http://localhost:8000/${mes.document.fileUrl.replace(/\\/g, '/')}`}
                                                    alt="Documento enviado"
                                                    className="mb-2 rounded max-h-60 object-contain"
                                                />
                                            )}

                                            <p className="whitespace-pre-wrap">{mes.content}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(mes.timeStamp).toLocaleString('pt-BR', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="w-full sticky bottom-0 bg-zinc-900 px-6 py-4 border-t border-zinc-800">
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Digite sua mensagem..."
                                        className="flex-1 px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium"
                                    >
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white space-y-4">
                            <p className="text-xl font-semibold text-center">
                                Converta sua imagem ou documento em texto automaticamente
                            </p>
                            <label className="cursor-pointer bg-indigo-500 shadow-lg font-bold text-zinc-100 px-4 py-2 rounded hover:bg-indigo-600 transition">
                                Enviar imagem ou documento
                                <input
                                    type="file"
                                    accept="image/*,.pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileUpload(file);
                                    }}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}