const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  payment_method: {
    type: String,
    enum: ['cash_on_delivery', 'online_payment'],
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  shipping_city: {
    type: String,
    required: true
  },
  shipping_state: {
    type: String,
    required: true
  },
  shipping_country: {
    type: String,
    required: true
  },
  shipping_postal_code: {
    type: String,
    required: true
  },
  // Additional fields
  order_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date
  }
}, {
  timestamps: true,
  strict: false
});

module.exports = model('Order', orderSchema);