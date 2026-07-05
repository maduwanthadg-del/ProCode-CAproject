const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Please add a username'], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['Police', 'Hospital'], 
    required: true 
  },
  departmentId: { 
    type: String, 
    required: [true, 'Please add a department ID'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);