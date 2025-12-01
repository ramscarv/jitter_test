const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/', orderRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gerenciamento de Pedidos',
    version: '1.0.0',
    endpoints: {
      create: 'POST /order',
      get: 'GET /order/:orderId',
      list: 'GET /order/list',
      update: 'PUT /order/:orderId',
      delete: 'DELETE /order/:orderId'
    }
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📚 Documentação disponível em http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();