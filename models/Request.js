const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    postingImage: { 
      type: String,
      required: true
    },
    postingId: {
      type: String,
      required: false,
    },
    requestDates: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("Request", RequestSchema);
