const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true  // Adicionando índice aqui ao invés de criar índice separado
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  items: [itemSchema]
}, {
  timestamps: true
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;