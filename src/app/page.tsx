import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="bg-zinc-900 text-zinc-100 min-h-screen">
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Leitor Inteligente de Documentos com OCR e IA
        </h1>

        <p className="mb-6 text-zinc-300 text-lg leading-relaxed text-justify">
          Este sistema foi desenvolvido para automatizar a leitura, interpretação e organização de documentos digitalizados.
          Através da combinação de tecnologias de OCR (Reconhecimento Óptico de Caracteres) e Inteligência Artificial,
          ele permite extrair textos de arquivos em imagem e compreender o conteúdo de maneira contextual,
          oferecendo insights e explicações interativas.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">🔍 Funcionalidades principais:</h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-300 mb-6">
          <li>Envio de arquivos locais (.png, .jpg)</li>
          <li>Extração precisa de texto com Tesseract.js</li>
          <li>Consulta e interpretação do conteúdo extraído via Gemini</li>
          <li>Respostas inteligentes sobre atas, comunicados, instruções, entre outros</li>
          <li>Armazenamento de arquivos e textos com histórico vinculado à conversa</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mb-2">🛠️ Tecnologias utilizadas:</h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-300">
          <li><strong>Next.js</strong> — Aplicação frontend moderna e reativa</li>
          <li><strong>NestJS</strong> — Backend estruturado e modular</li>
          <li><strong>PostgreSQL + Prisma</strong> — Persistência de dados e ORM</li>
          <li><strong>Tesseract.js</strong> — Reconhecimento de texto em imagens</li>
          <li><strong>Gemini API</strong> — Interpretação contextual do conteúdo</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.linkedin.com/in/braga-marcos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-3.369-4-3.112-4 0v5.604h-3v-10h3v1.528c1.396-2.586 7-2.777 7 2.476v5.996z" />
            </svg>
            Meu LinkedIn
          </a>
        </div>
      </section>
    </main>

  );
}
