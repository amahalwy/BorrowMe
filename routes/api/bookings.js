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


router.post("/", upload.single("file"), (req, res) => {
  const { isValid, errors } = validateBookingInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newBooking = new Booking({
    ownerId: req.body.ownerId,
    requestorId: req.body.requestorId,
    postingId: req.body.postingId,
    requestDates: req.body.requestDates,
    price: req.body.price
  });

  newBooking
    .save()
    .then(booking => res.json(booking))
    .catch((err) => res.json(err));
});


router.delete("/",upload.single("file"),  (req, res) => {
  Request.findOneAndDelete(
    {
      _id: req.body.id,
    },
    (err, request) => {
      if (err) {
        res.send("Error removing the request");
      } else {
        // console.log(request);
        res.json("Complete!");
      }
    }
  );
});



// router.delete("/", upload.single("file"), (req, res) => {
//   console.log(req.body);
//   Booking.findOneAndDelete({ _id: req.body.id })
//   // .then((booking) => {
//   //   if (!booking) {
//   //     res.status(404).json("Booking not found. Try again.");
//   //   } else {
//   //     booking
//   //       .delete()
//   //       .then((res) => res.json("Complete! Beep boop, booking DELETED"))
//   //       .carch((err) => res.json(err));
//   //   }
//   // });
//   // })
//     ,(err, request) => {
//       if (err) {
//         res.send("Error removing the booking");
//       } else {
//         // console.log(request);
//         res.json("Complete! Booking = DELETED");
//       }
//     }
//   );
// });


module.exports = router;