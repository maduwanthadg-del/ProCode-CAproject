const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User'); 
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB();

app.use(cors());
app.use(express.json());
app.set('socketio', io);

// Routes
app.use('/api/accidents', require('./routes/accidentRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

(async () => {
  try {
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      await User.create({ 
        username: 'admin', 
        password: 'password123',
        role: 'Police',
        departmentId: 'HQ-Gampaha-01'
      });
      console.log('👮 Admin account seeded successfully');
    }
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
})();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Emergency Server running on port ${PORT}`));