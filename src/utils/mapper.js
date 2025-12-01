/**
 * Transforma o JSON recebido da API para o formato do banco de dados
 * @param {Object} inputData - Dados recebidos da requisição
 * @returns {Object} - Dados mapeados para o formato do banco
 */
const mapOrderData = (inputData) => {
  try {
    // Mapeamento dos campos principais
    const mappedData = {
      orderId: inputData.numeroPedido,
      value: inputData.valorTotal,
      creationDate: new Date(inputData.dataCriacao),
      items: inputData.items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    // Validação básica
    if (!mappedData.orderId || mappedData.orderId.trim() === '') {
      throw new Error('orderId é obrigatório');
    }

    if (isNaN(mappedData.value) || mappedData.value <= 0) {
      throw new Error('value deve ser um número positivo');
    }

    if (isNaN(mappedData.creationDate.getTime())) {
      throw new Error('creationDate deve ser uma data válida');
    }

    return mappedData;
  } catch (error) {
    throw new Error(`Erro no mapeamento dos dados: ${error.message}`);
  }
};

module.exports = { mapOrderData };