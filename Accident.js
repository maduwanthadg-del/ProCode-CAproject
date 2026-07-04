const mongoose = require('mongoose'); 

const AccidentSchema = new mongoose.Schema({
  reporterType: { 
    type: String, 
    default: 'Guest' 
  },
  injuredCount: { 
    type: Number, 
    required: true,
    default: 1 
  },
  vehicles: [String], 
  incidentType: { 
    type: String, 
    required: true 
  },
  severity: { 
    type: String, 
    enum: ['Minor', 'Major', 'Critical'], 
    required: true 
  },
  servicesRequired: [String], 
  description: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Dispatched', 'Resolved'], 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Accident', AccidentSchema);
