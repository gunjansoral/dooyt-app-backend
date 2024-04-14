const { Schema, model } = require('mongoose');

const customerInteractionSchema = new Schema({
  // Reference to the customer who performed the interaction
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  // Reference to the merchant associated with the interaction
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  // Type of interaction performed by the customer
  interaction_type: {
    type: String,
    enum: [
      'visit',              // Customer visited the merchant's website or app
      'click',              // Customer clicked on a link or button
      'purchase',           // Customer made a purchase
      'query',              // Customer made a query or request for information
      'wishlist_addition',  // Customer added an item to the wishlist
      'wishlist_removal',   // Customer removed an item from the wishlist
      'online_visit'        // Customer engaged in an online visit or consultation
      // Add more interaction types as needed
    ],
    required: true
  },
  // Price of the purchased product or service (if applicable)
  price: {
    type: Number
  },
  // Category of the purchased product (if applicable)
  category: {
    type: String
  },
  // Name of the purchased product or service (if applicable)
  product_name: {
    type: String
  },
  // Text of the customer's query or request for information (if applicable)
  query: {
    type: String
  },
  // URL or identifier of the clicked link or button (if interaction_type is 'click')
  clicked_item: {
    type: String
  },
  // Details of the online visit or consultation (if applicable)
  online_visit_details: {
    type: String
  }
}, {
  // Automatically generate timestamps for created_at and updated_at fields
  timestamps: true
});

module.exports = model('CustomerInteraction', customerInteractionSchema);