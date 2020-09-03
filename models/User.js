const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Posting = require('./Posting')

const UserSchema = new Schema({
  postings: [{type: Schema.Types.ObjectId, ref: "Posting" }],
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zipCode: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

module.exports = User = mongoose.model("User", UserSchema);