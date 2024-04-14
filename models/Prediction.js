const { Schema, model } = require('mongoose');

const predictionSchema = new Schema({
  // Reference to the customer for whom the prediction is made
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  // Features (input variables) for the prediction
  features: {
    // Number of visits to the merchant's website or app
    visit_count: {
      type: Number,
      default: 0
    },
    // Total number of clicks made by the customer
    click_count: {
      type: Number,
      default: 0
    },
    // Total number of purchases made by the customer
    purchase_count: {
      type: Number,
      default: 0
    },
    // Total amount spent by the customer on purchases
    total_spent: {
      type: Number,
      default: 0
    },
    // Total number of queries or requests made by the customer
    query_count: {
      type: Number,
      default: 0
    },
    // Total number of items added to the customer's wishlist
    wishlist_addition_count: {
      type: Number,
      default: 0
    },
    // Total number of items removed from the customer's wishlist
    wishlist_removal_count: {
      type: Number,
      default: 0
    },
    // Total number of online visits or consultations
    online_visit_count: {
      type: Number,
      default: 0
    }
    // Add more features as needed
  },
  // Target variable: Whether the customer is predicted to make a purchase (true/false)
  purchase_prediction: {
    type: Boolean
  },
  // Probability of purchase predicted by the model
  purchase_probability: {
    type: Number
  }
}, {
  // Automatically generate timestamps for created_at and updated_at fields
  timestamps: true
});

module.exports = model('Prediction', predictionSchema);
