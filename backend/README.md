# 📦 Backend – Delivery App (Documentação Técnica)

Esta documentação descreve **toda a arquitetura, decisões técnicas, tecnologias utilizadas e fluxo de funcionamento** do backend do projeto **Delivery App**, desenvolvido em **Node.js + TypeScript**, com **Prisma ORM**, **Docker** e **validações modernas**.

O objetivo deste backend é fornecer uma **API REST robusta, segura e escalável**, pronta para integração com um frontend (React / Next.js).

---

## 🧠 Visão Geral da Arquitetura

O backend segue uma arquitetura **modular e orientada a domínio**, separando responsabilidades de forma clara:

```
src/
├── app.ts
├── server.ts
├── database/
│   └── prisma.ts
├── errors/
│   └── AppError.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── validate.middleware.ts
│   └── error.middleware.ts
├── modules/
│   ├── auth/
│   ├── users/
│   ├── products/
│   └── sales/
└── routes.ts
```

Cada **módulo** possui:

* `controller` → camada HTTP
* `service` → regras de negócio
* `routes` → definição das rotas
* `schema` → validações com Zod

---

## ⚙️ Tecnologias Utilizadas e Justificativas

### 🟦 Node.js + Express

* Plataforma madura e amplamente usada
* Excelente ecossistema
* Ideal para APIs REST

### 🟦 TypeScript

* Tipagem estática
* Redução de bugs em tempo de desenvolvimento
* Melhor DX (Developer Experience)

### 🟦 Prisma ORM

* ORM moderno e typesafe
* Integração nativa com TypeScript
* Migrations confiáveis
* Cliente tipado automaticamente

### 🟦 MySQL (via Docker)

* Banco relacional robusto
* Isolado via container
* Fácil setup em qualquer ambiente

### 🟦 Docker + Docker Compose

* Padronização do ambiente
* Evita problemas de versão
* Facilita onboarding e deploy

### 🟦 JWT (JSON Web Token)

* Autenticação stateless
* Ideal para APIs REST
* Fácil integração com frontend

### 🟦 Zod

* Validação declarativa
* Tipos inferidos automaticamente
* Integração direta com TypeScript
* Evita código defensivo espalhado

---

## 🗄️ Modelagem do Banco de Dados

### 🧑 User

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(CUSTOMER)

  sales          Sale[] @relation("UserSales")
  salesAsSeller  Sale[] @relation("SellerSales")

  createdAt DateTime @default(now())
}
```

### 📦 Product

```prisma
model Product {
  id    Int     @id @default(autoincrement())
  name  String
  price Decimal @db.Decimal(10, 2)
  url   String
}
```

### 🧾 Sale

```prisma
model Sale {
  id           Int        @id @default(autoincrement())
  userId       Int
  sellerId     Int
  totalPrice   Decimal
  status       SaleStatus @default(PENDING)
  deliveryAddr String
  deliveryNum  String

  user     User @relation("UserSales", fields: [userId], references: [id])
  seller   User @relation("SellerSales", fields: [sellerId], references: [id])
  products SaleProduct[]

  createdAt DateTime @default(now())
}
```

### 🔗 SaleProduct (N:N)

```prisma
model SaleProduct {
  saleId    Int
  productId Int
  quantity  Int

  sale    Sale    @relation(fields: [saleId], references: [id])
  product Product @relation(fields: [productId], references: [id])

  @@id([saleId, productId])
}
```

---

## 🔐 Autenticação e Autorização

### Autenticação

* Login via email + senha
* Senha criptografada
* JWT assinado com `JWT_SECRET`

### Autorização por Role

* `CUSTOMER`
* `SELLER`

Middlewares garantem:

* Apenas seller altera status
* Customer acessa apenas suas vendas
* Seller acessa apenas vendas que vendeu

---

## 🔁 Fluxo de Status da Venda

Estados possíveis:

```
PENDING → PREPARING → IN_TRANSIT → DELIVERED
```

Controle feito no **service**, garantindo:

* Transições válidas
* Impossível pular etapas

---

## 🛡️ Middleware Global de Erros

### AppError

```ts
class AppError extends Error {
  statusCode: number;
}
```

### errorMiddleware

* Captura erros esperados
* Retorna JSON padronizado
* Evita respostas HTML

Status tratados:

* 400 → validação
* 401 → autenticação
* 403 → autorização
* 404 → recurso inexistente
* 500 → erro interno

---

## ✅ Validação com Zod

* Schemas por domínio
* Middleware genérico `validate`
* Tipos inferidos com `z.infer`
* Nenhuma validação no service

Exemplo:

```ts
z.object({
  body: z.object({
    sellerId: z.number(),
    products: z.array(...)
  })
})
```

---

## 🌐 Endpoints Principais

### Auth

* `POST /auth/login`

### Products

* `GET /products`

### Sales

* `POST /sales`
* `GET /sales/me`
* `GET /sales/seller`
* `GET /sales/:id`
* `PATCH /sales/:id/status`

---

## 🧪 Seed e Ambiente de Teste

* Seed automático com Prisma
* Usuários pré-criados
* Produtos iniciais
* Banco isolado por container

---

## 📌 Próximo Passo

Frontend com **React / Next.js**, consumindo esta API.

---

**Autor:** André Lucas
