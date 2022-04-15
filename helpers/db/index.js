const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER);
    console.log('Database connection successfully!')
  } catch (error) {
    console.log('Database connection failed!')
  } 
}