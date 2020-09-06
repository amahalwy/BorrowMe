const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Posting = require("../../models/Posting");
const User = require("../../models/User");
const validatePostingInput = require("../../validation/postings");
const multer = require("multer");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;
const fs = require("fs");

router.get("/:userId", (req, res) => {
  Posting.find({ ownerId: req.params })
    .then((postings) => res.json(postings))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;