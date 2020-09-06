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

router.get("")

router.get("")


router.get("");

router.get("");