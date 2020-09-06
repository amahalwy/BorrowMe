const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    postingId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: false,
    },
    endDate: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("Request", RequestSchema);
