const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    postingId: {
      type: String,
      required: false
    },
    requestDates: {
      type: Array,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("Request", RequestSchema);
