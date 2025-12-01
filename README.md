# jitter_test
Repositório destinado para armazenar o projeto jitter

# 📦 Order Management API

Uma API RESTful para gerenciamento de pedidos desenvolvida com **Node.js**, **Express** e **MongoDB**.

---

## 🚀 Funcionalidades

- ✅ CRUD Completo de pedidos  
- ✅ Mapeamento automático de campos (PT-BR → EN)  
- ✅ Validação robusta de dados  
- ✅ Respostas HTTP semânticas  
- ✅ Tratamento de erros detalhado  
- ✅ Conexão com MongoDB  
- ✅ Testes automatizados das rotas  

---

## 📋 Pré-requisitos

- Node.js (v14 ou superior)  
- MongoDB (local ou Atlas)  
- NPM ou Yarn  
- Postman / Thunder Client / curl para testes  

---

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd order-api

### 2. Instalação de dependências
npm install

### 3. Configure as variáveis de ambiente
PORT=3000
MONGODB_URI=mongodb://localhost:27017/order_db
NODE_ENV=development

### 4. Configure o MongoDB (local)
mongod

### 5. Execute a API
npm run dev

### 6. Estrutura do Banco de Dados (MongoDB Schema Local)
{
  orderId: String,
  value: Number,
  creationDate: Date,
  items: [
    {
      productId: Number,
      quantity: Number,
      price: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}

### 7. Endpoints da API
http://localhost:3000
http://localhost:3000/order/order (getlist)
http://localhost:3000/order/:order  (post)
http://localhost:3000/order/:orderId  (get)
http://localhost:3000/order/:order  (get/put/delete)