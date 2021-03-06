const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostingSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "User"},
  title: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String, 
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String, 
    required: true
  },
  image: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: true
  },
  price: {
    type: String,
    required: true
  }
  // available: {
  //     type: Boolean,
  //     required: true
  //   }
}, {
  timestamps: true
})

module.exports = Posting = mongoose.model("Posting", PostingSchema);