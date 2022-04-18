const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    unique: true,
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  },
  username: {
    type: String,
    unique: true,
    maxLength: [100, "username can't be longer than 255 characters"],
    required: [true, "can't be blank"], 
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
    index: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ],
  description: String
},
{
  collection: 'users',
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
