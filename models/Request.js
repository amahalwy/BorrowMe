const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    postingId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Request = mongoose.model("Request", RequestSchema);
