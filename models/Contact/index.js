const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  phone: {
    type: String,
    maxLength: [100, "phone number can't be longer than 255 characters"],
    required: [true, "phone number can't be blank"], 
    match: [/^[0-9]+$/, 'is invalid']
  },
  description: String
},
{
  collection: 'contacts',
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
