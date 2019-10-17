const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  billingType : {
    type: String,
    required: false,
    default : 'PAYPERUSE',
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  currency : {
    type: String,
    required: false,
    default : 'USD',
    trim: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  maxSubmissionsPerMonth: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

SubscriptionSchema.plugin(timestamp);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;