const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Request = require("../../models/Request");
const Posting = require("../../models/Posting");
const User = require("../../models/User");
const validatePostingInput = require("../../validation/postings");
const multer = require("multer");
const fs = require("fs");

const upload = multer();

router.get("/", (req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json(err));
})

router.post("/", (req, res) => {
  const newRequest = new Request({
    requestorId: req.body.requestorId,
    postingId: req.body.postingId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })

  newRequest.save()
  .then(request => res.json(request))
  .catch(err => res.json(err));
});

// router.delete("/:requestId", req);

module.exports = router;