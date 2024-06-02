const { Schema, model } = require('mongoose');

const merchantCategory = new Schema({
  title: {
    type: String,
    required: true
  }
},
  {
    strict: false,
    timestamps: true
  })

module.exports = model('MerchantCategory', merchantCategory)