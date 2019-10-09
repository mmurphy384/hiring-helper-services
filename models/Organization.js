const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    default: null,
    trim: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }
});

OrganizationSchema.plugin(timestamp);

const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;