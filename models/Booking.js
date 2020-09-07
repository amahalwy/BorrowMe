const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    renterId: { type: Schema.Types.ObjectId, ref: "User" },
    postingId: {
      type: String,
      required: true
    },
    requestedDates: {
      type: Array,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Booking = mongoose.model("Booking", BookingSchema);
