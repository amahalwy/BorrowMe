const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    ownerId: { 
      type: String,
      required: true   
    },
    requestorId: {
      type: String,
      required: true
    },
    requestorName : { 
      type: String,
      required: true 
    },
    postingId: {
      type: String,
      required: true,
    },
    requestDates: {
      type: Array,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    bookingImage: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Booking = mongoose.model("Booking", BookingSchema);
