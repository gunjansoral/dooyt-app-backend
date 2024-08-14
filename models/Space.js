const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Office', 'Event', 'Retail', 'Co-Working', 'Other'], // Example categories
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict: false
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
