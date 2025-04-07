# 🔗 URL Shortener API

A RESTful API built with **NestJS**, **Prisma**, and **PostgreSQL** that allows users to shorten URLs, track clicks, and manage their links. Supports both **authenticated** and **anonymous** usage.

---

## 🚀 Features

- ✅ Register and login with JWT authentication
- ✅ Shorten URLs (authenticated or anonymous)
- ✅ Redirect via short code
- ✅ Track clicks on each URL
- ✅ Manage URLs (list, update, delete) for logged-in users
- ✅ Fully documented with Swagger
- ✅ Containerized with Docker
- ✅ Includes working `.env.example` and Prisma migration

---

## 🧰 Tech Stack

- **NestJS** - backend framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - relational database
- **JWT** - authentication and authorization
- **Swagger** - API documentation
- **Docker & Docker Compose** - container orchestration

---

## ⚙️ Environment Setup

### 🔐 Environment Variables

This project already includes a working `.env.example`. To start, just copy it:

```bash
cp .env.example .env
```

You can adjust values if necessary:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/urlshortener
JWT_SECRET=uma_super_senha_secreta
JWT_EXPIRES_IN=1d
BASE_URL=http://localhost:3000
```

---

## 🐳 Running with Docker

### 📦 Build and Run

```bash
docker-compose up --build
```

This will:

- Start a PostgreSQL database on port `5432`
- Start the NestJS API server on port `3000`
- Apply Prisma migrations automatically (`migrate deploy`)
- Automatically install dependencies

> 🧠 **Note:** On first run, the database will be empty. Prisma will apply the initial migration (`init`) but no data will be populated. Use `npx prisma studio` to view/manage DB content.

---

## 📘 API Documentation

After starting the app, open:

```
http://localhost:3000/api
```

There you will find the full **Swagger UI** documentation of the API.

---

## 📂 Endpoints Overview

### 🔐 Auth

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Authenticate and receive a JWT

### 👤 Users

- `GET /users/me` – Get authenticated user's profile (requires JWT)

### 🔗 URLs

- `POST /shorten` – Shorten a new URL (auth optional)
- `GET /:shortCode` – Redirect to original URL
- `GET /urls/mine` – List authenticated user's shortened URLs
- `PATCH /urls/:id` – Update a shortened URL (auth required)
- `DELETE /urls/:id` – Delete a shortened URL (auth required)

---

## 🧪 Example Requests

### 🔗 Shorten a URL

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com"}'
```

### 🔐 Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "StrongPassword123!"}'
```

---

## 🛠 Development without Docker

```bash
# Install dependencies
npm install

# Create and configure your database if needed
# Apply migrations
npx prisma migrate dev

# Run the app
npm run start:dev
```

---

## 🧼 Prisma & Database Commands

- Generate Prisma Client: `npx prisma generate`
- Create migration: `npx prisma migrate dev --name init`
- Deploy migrations (prod): `npx prisma migrate deploy`
- Open DB GUI: `npx prisma studio`

---

## 📦 Project Structure

```
src/
│
├── auth/              # Auth module (login, register, guards)
├── users/             # User profile
├── urls/              # URL shortening logic
├── prisma/            # Prisma service and schema
└── main.ts            # Entry point
```

---

## 📝 License

MIT License. Feel free to use and adapt.
