const { Schema, model } = require('mongoose');

const subscriptionPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Remove leading/trailing whitespace
  },
  description: {
    type: String,
    required: true,
    maxlength: 500 // Limit description to 500 characters
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ensure price is non-negative
  },
  features: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0, // Ensure at least one feature is provided
      message: 'At least one feature is required'
    }
  },
  validityPeriod: {
    type: Number, // in days, months, or years
    min: 1 // Ensure validity period is at least 1
  },
  autoRenewal: {
    type: Boolean,
    default: false
  },
  discountOffers: {
    type: String,
    maxlength: 100 // Limit discount offers to 100 characters
  },
  paymentInterval: {
    type: String,
    enum: ['monthly', 'annually'],
    default: 'monthly'
  },
  usageLimits: {
    type: Map, // or specify a nested schema for detailed limits
    of: {
      type: Number,
      min: 0 // Ensure usage limits are non-negative
    }
  },
  supportLevel: {
    type: String,
    enum: ['basic', 'priority'],
    default: 'basic'
  },
  accessControls: {
    type: [String]
  },
  upgradeDowngradeOptions: {
    type: Boolean,
    default: true
  },
  cancellationPolicy: {
    type: String,
    maxlength: 500 // Limit cancellation policy to 500 characters
  }
});

module.exports = model('SubscriptionPlan', subscriptionPlanSchema);