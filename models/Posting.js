const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User")

const PostingSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "User"},
  title: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  zipCode: {
    type: String, 
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
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