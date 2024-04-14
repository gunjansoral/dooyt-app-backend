const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  postal_code: {
    type: String
  },
  date_of_birth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  profile_picture: {
    type: String // URL to profile picture
  },
  // Additional fields
  preferences: {
    type: Map, // Example: { "category": "electronics", "brand": "Samsung" }
    of: String
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  loyalty_points: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  strict: false
});

module.exports = model('Customer', customerSchema);