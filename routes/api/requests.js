const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Request = require("../../models/Request");
const multer = require("multer");
const fs = require("fs");

const upload = multer();

router.get("/", (req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json(err));
})

router.post("/", (req, res) => {
  console.log(req.body);
  const newRequest = new Request({
    requestorId: req.body.requestorId,
    postingId: req.body.postingId,
    requestDates: req.body.requestDates
  })
 
  newRequest
  .save()
  .then(request => res.json(request))
  .catch(err => res.json(err));
});

router.delete("/", (req, res) => {
    Request.findOneAndDelete({
      _id: req.body.id
    }, (err, request) => {
      if (err) {
        res.send('Error removing')
      } else {
        // console.log(request);
        res.json("Complete!");
      }
    });
});

module.exports = router;