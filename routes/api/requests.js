const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Request = require("../../models/Request");
const multer = require("multer");
const validateRequestInput = require('../../validation/requests');

const upload = multer();

router.get("/", (req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json(err));
})

router.get("/:requestId", (req, res) => {
  Request.findById(req.params.requestId)
    .then(request => res.json(request))
    .catch((err) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateRequestInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRequest = new Request({
      requestorName: req.body.requestorName,
      requestorId: req.body.requestorId,
      receiverId: req.body.receiverId,
      postingId: req.body.postingId,
      requestDates: req.body.requestDates,
      postingImage: req.body.postingImage,
      postingTitle: req.body.postingTitle,
      amount: req.body.amount,
    });

    newRequest
      .save()
      .then((request) => res.json(request))
      .catch((err) => res.json(err));
  }
);

router.delete(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Deleted!" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }
);

module.exports = router;