const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    requestorName: { 
      type: String,
      required: true
    },
    postingImage: {
      type: String,
      required: true,
    },
    postingTitle: {
      type: String,
      required: true,
    },
    postingId: {
      type: String,
      required: false,
    },
    requestDates: {
      type: Array,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("Request", RequestSchema);
