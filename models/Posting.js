const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostingSchema = new Schema({
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
  }
// available: {
//     type: Boolean,
//     required: true
//   }
}, {
  timestamps: true
})

module.exports = Posting = mongoose.model("Posting", PostingSchema);