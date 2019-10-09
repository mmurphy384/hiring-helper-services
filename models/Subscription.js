const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

SubscriptionSchema.plugin(timestamp);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;