const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access Denied: Invalid Badge ID or Password' 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already in use" });
    }

    const newUser = await User.create({ username, password, role });
    
    res.status(201).json({ 
      success: true, 
      message: "Authority account created successfully",
      data: { username: newUser.username, role: newUser.role } 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};