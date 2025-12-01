const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Erro de duplicação (chave única)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Já existe um registro com este ID'
    });
  }

  // Erro padrão
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
};

module.exports = errorHandler;