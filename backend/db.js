const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = 'mongodb://127.0.0.1:27017/emergencyDB';

  const connect = async (uri) => {
    await mongoose.connect(uri, { dbName: 'emergencyDB' });
  };

  const tryConnect = async (uri, label) => {
    await connect(uri);
    console.log(`✅ MongoDB Connected (${label})`);
  };

  if (primaryUri) {
    try {
      await tryConnect(primaryUri, 'primary');
      return;
    } catch (err) {
      console.warn(`⚠️ Primary DB connection failed (${err.message}).`);
    }
  }

  try {
    await tryConnect(fallbackUri, 'local');
    return;
  } catch (localErr) {
    console.warn(`⚠️ Local MongoDB connection failed (${localErr.message}).`);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('ℹ️ Starting in-memory MongoDB for development...');
    const mongoServer = await MongoMemoryServer.create();
    try {
      await connect(mongoServer.getUri());
      console.log('✅ MongoDB Connected (in-memory)');
      return;
    } catch (memErr) {
      console.error('❌ In-memory MongoDB connection failed:', memErr.message);
    }
  }

  console.error('❌ Unable to connect to any MongoDB instance.');
  process.exit(1);
};
module.exports = connectDB;