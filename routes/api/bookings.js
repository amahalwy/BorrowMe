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
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json(err));
});

// router.post("/", upload.single("file"), (req, res) => {
//   const { isValid, errors } = validateBookingInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const newRequest = new Request({
//     requestorId: req.body.requestorId,
//     postingId: req.body.postingId,
//     requestDates: req.body.requestDates,
//   });

//   newRequest
//     .save()
//     .then((request) => res.json(request))
//     .catch((err) => res.json(err));
// });

// router.delete("/", (req, res) => {
//   Request.findOneAndDelete(
//     {
//       _id: req.body.id,
//     },
//     (err, request) => {
//       if (err) {
//         res.send("Error removing the request");
//       } else {
//         // console.log(request);
//         res.json("Complete!");
//       }
//     }
//   );
// });


module.exports = router;