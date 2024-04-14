const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  // Additional fields
  sku: {
    type: String,
    unique: true
  },
  weight: {
    type: Number
  },
  dimensions: {
    type: {
      length: Number,
      width: Number,
      height: Number
    }
  },
  color: {
    type: String
  },
  material: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
}, {
  timestamps: tue,
  strict: false
});

module.exports = model('Product', productSchema);
