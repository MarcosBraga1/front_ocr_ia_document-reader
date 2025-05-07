# Leitor Inteligente de Documentos com OCR + IA

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

![Captura de tela 2025-05-07 011145](https://github.com/user-attachments/assets/31099630-1618-4aa4-9409-1cd3d1422afb)
![Captura de tela 2025-05-07 011336](https://github.com/user-attachments/assets/63081b04-569f-43f7-abed-1c51b8f45086)


## Sobre a Aplicação
Este projeto é uma aplicação web que permite o envio de imagens e documentos (como `.png`, `.jpg`), realiza a extração de texto via OCR utilizando o Tesseract.js e, em seguida, envia o conteúdo para uma IA generativa (Gemini) que fornece interpretação interativa e respostas contextuais com base no conteúdo extraído.

A aplicação foi desenvolvida como solução para um desafio técnico proposto em um processo seletivo, com o objetivo de demonstrar domínio técnico em desenvolvimento.

### Tecnologias Usadas
- **Frontend:** Next.js + Tailwind CSS

## Instruções de Instalação
### Pré-requisitos
**1.** Node (versão 18 ou superior)
**2.** npm ou yarn

### Instalação
#### Front-end

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Instruções de Uso
Após seguir os passos de instalação, siga estas instruções para usar a aplicação:

#### 1. Realize o cadastro
Acesse `http://localhost:3000/signup` e crie sua conta de usuário, você será automaticamente redirecionado para o sistema.

#### 2. Crie uma nova conversa
No painel lateral, clique em "Nova conversa" para iniciar uma sessão.

#### 3. Envie um documento
Dentro da conversa:
- Clique em "Enviar imagem ou documento"
- Selecione um arquivo `.png`, `.jpg`.
- O sistema irá extrair o texto via OCR e exibir como uma mensagem.

#### 4. Faça perguntas sobre o conteúdo
Digite perguntas no campo de mensagem. A resposta será gerada automaticamente por IA (Google Gemini).

#### 5. Baixe a conversa em PDF
Clique no ícone de download no topo da conversa para gerar um PDF com os textos e imagens trocados.

## Licença
Este projeto está licenciado sob os termos da [MIT License](LICENSE).
