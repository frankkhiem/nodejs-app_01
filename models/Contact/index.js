const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');

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
    maxLength: [100, "phone number can't be longer than 100 characters"],
    required: [true, "phone number can't be blank"], 
    match: [/^[0-9]+$/, 'is invalid']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String
},
{
  collection: 'contacts',
  timestamps: true
});

// Add plugin mongoose soft delete
contactSchema.plugin(mongooseDelete, { 
  deletedAt : true ,
  overrideMethods: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
