const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
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
  expertise: {
    type: [String], // Example: ['Consulting', 'Coaching']
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: Number,
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  assignedServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    }
  ],
  linkedSpaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      required: true, // Ensures each expert is linked to at least one space
    }
  ],
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
  performanceMetrics: {
    type: Map,
    of: String,
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

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
