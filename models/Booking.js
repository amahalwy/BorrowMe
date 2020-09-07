const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    renterId: { type: Schema.Types.ObjectId, ref: "User" },
    postingId: {
      type: String,
      required: true,
    },
    requestDates: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Booking = mongoose.model("Booking", BookingSchema);
