const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Booking = require("../../models/Booking");
const multer = require("multer");
const validateBookingInput = require("../../validation/bookings");

const upload = multer();

router.get("/", (req, res) => {
  Booking.find({ownerId: req.body.id})
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateBookingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newBooking = new Booking({
      ownerId: req.body.ownerId,
      requestorId: req.body.requestorId,
      requestorName: req.body.requestorName,
      postingId: req.body.postingId,
      requestDates: req.body.requestDates,
      price: req.body.price,
      bookingImage: req.body.bookingImage
    });

    newBooking
      .save()
      .then((booking) => res.json(booking))
      .catch((err) => res.json(err));
  }
);

router.delete(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Deleted!" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }
);

module.exports = router;