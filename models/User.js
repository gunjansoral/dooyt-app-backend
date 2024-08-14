const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  socialLinks: {
    type: Map,
    of: String,
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified'],
    default: 'Pending',
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  preferences: {
    type: Map,
    of: String,
  },
  privacySettings: {
    type: Map,
    of: String,
  },
  savedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  savedServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    }
  ],
  savedSpaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
    }
  ],
  walletBalance: {
    type: Number,
    default: 0,
  },
  notifications: [
    {
      message: String,
      read: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ]
}, {
  timestamps: true,
  strict: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
