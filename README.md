# 🔗 URL Shortener API

Uma API RESTful construída com **NestJS**, **Prisma** e **PostgreSQL**, que permite encurtar URLs, rastrear cliques e gerenciar links. Suporta uso **autenticado** e **anônimo**.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login com autenticação via JWT
- ✅ Encurtamento de URLs (com ou sem autenticação)
- ✅ Redirecionamento via código curto
- ✅ Rastreamento de cliques por URL
- ✅ Gerenciamento de URLs (listar, editar, remover) para usuários autenticados
- ✅ Documentação completa via Swagger
- ✅ Totalmente containerizado com Docker
- ✅ Arquivo `.env.example` incluso
- ✅ Migrações automáticas com Prisma

---

## 🧰 Stack Tecnológica

- **NestJS** – Framework backend
- **Prisma** – ORM para PostgreSQL
- **PostgreSQL** – Banco de dados relacional
- **JWT** – Autenticação e autorização
- **Swagger** – Documentação da API
- **Docker & Docker Compose** – Orquestração de containers

---

## ⚙️ Configuração do Ambiente

### 🔐 Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Exemplo de conteúdo:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/urlshortener
JWT_SECRET=uma_super_senha_secreta
JWT_EXPIRES_IN=1d
BASE_URL=http://localhost:3000
```

---

## 🐳 Executando com Docker

### 📦 Build e Inicialização

```bash
docker-compose up --build
```

Isso irá:

- Subir o PostgreSQL na porta `5432`
- Subir a API NestJS na porta `3000`
- Aplicar automaticamente as migrações Prisma (`migrate deploy`)
- Instalar dependências automaticamente

> ℹ️ **Nota:** No primeiro uso, o banco estará vazio. As migrações iniciais serão aplicadas, mas nenhum dado será populado.

---

## 🛠 Prisma Studio

O **Prisma Studio** é uma interface web para visualizar e editar os dados do banco.

### ▶️ Rodando via Docker

Execute:

```bash
docker compose exec app npx prisma studio
```

O Prisma Studio será iniciado automaticamente e estará disponível na URL:

```
http://localhost:5555
```

> ✅ **Observação:** Dentro do Docker, o Prisma Studio sempre rodará na porta `5555`.

### 🧪 Rodando fora do Docker

Se quiser rodar localmente (fora do container), use:

```bash
npx prisma studio
```

Certifique-se de que o `DATABASE_URL` aponte para `localhost` e que o PostgreSQL esteja acessível.

---

## 📘 Documentação da API (Swagger)

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api
```

---

## 📂 Visão Geral das Rotas

### 🔐 Autenticação

- `POST /auth/register` – Registrar novo usuário
- `POST /auth/login` – Autenticar e receber token JWT

### 👤 Usuário

- `GET /users/me` – Obter perfil do usuário autenticado

### 🔗 URLs

- `POST /shorten` – Encurtar nova URL (opcionalmente autenticado)
- `GET /:shortCode` – Redirecionar para a URL original
- `GET /urls/mine` – Listar URLs encurtadas pelo usuário logado
- `PATCH /urls/:id` – Editar URL (requer autenticação)
- `DELETE /urls/:id` – Deletar URL (requer autenticação)

---

## 🧪 Exemplos de Requisição

### 🔗 Encurtar URL

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com"}'
```

### 🔐 Registrar Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "StrongPassword123!"}'
```

---

## 👨‍💻 Desenvolvimento Local (sem Docker)

```bash
# Instalar dependências
npm install

# Aplicar migrações
npx prisma migrate dev

# Iniciar aplicação em modo dev
npm run start:dev
```

---

## 🧼 Comandos Úteis do Prisma

- Gerar cliente: `npx prisma generate`
- Criar nova migração: `npx prisma migrate dev --name init`
- Aplicar migrações no ambiente de produção: `npx prisma migrate deploy`
- Abrir Prisma Studio: `npx prisma studio`

---

## 📁 Estrutura do Projeto

```
src/
│
├── auth/              # Autenticação (login, registro, guards)
├── users/             # Perfil do usuário
├── urls/              # Lógica de encurtamento de URL
├── prisma/            # Prisma schema e service
└── main.ts            # Ponto de entrada
```


## Created by Stevie Kelvin