const Order = require('../models/order');
const { mapOrderData } = require('../utils/mapper');

/**
 * Cria um novo pedido
 */
const createOrder = async (req, res) => {
  try {
    // Mapeia os dados recebidos
    const mappedData = mapOrderData(req.body);
    
    // Verifica se o pedido já existe
    const existingOrder = await Order.findOne({ orderId: mappedData.orderId });
    if (existingOrder) {
      return res.status(409).json({
        success: false,
        message: `Pedido com ID ${mappedData.orderId} já existe`
      });
    }

    // Cria o novo pedido
    const newOrder = new Order(mappedData);
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: newOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Obtém um pedido pelo ID
 */
const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido com ID ${orderId} não encontrado`
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido'
    });
  }
};

/**
 * Lista todos os pedidos
 */
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ creationDate: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao listar pedidos'
    });
  }
};

/**
 * Atualiza um pedido existente
 */
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Verifica se o pedido existe
    const existingOrder = await Order.findOne({ orderId });
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: `Pedido com ID ${orderId} não encontrado`
      });
    }

    // Mapeia os dados recebidos
    const mappedData = mapOrderData(req.body);
    
    // Atualiza o pedido
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      mappedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: updatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Deleta um pedido
 */
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: `Pedido com ID ${orderId} não encontrado`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pedido deletado com sucesso',
      data: deletedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar pedido'
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
  deleteOrder
};