const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const router = express.Router();
const Posting = require("../../models/Posting");
const validatePostingInput = require("../../validation/postings");


//    api/postings/'followed by whatever we have'
router.get("/", (req, res) => {
  Posting.find()
    .sort({ date: -1 })
    .then(postings => res.json(postings))
    .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
  console.log(Posting.findById("5f4d71df5d38dc4341fbcb64").title)
  Posting.findById(req.params.id)
    .then((posting) => {
      console.log(posting);
      res.json(posting);
    }
    , (err) => res.status(400).json(err));
})

router.post("/",
  // protects the route
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostingInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPosting = new Posting({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      zipCode: req.body.zipCode
    })

    newPosting.save()
    .then(posting => res.json(posting))
    .catch(err => res.status(400).json(err));
  }
)

// router.patch("/:postingId", (req, res) => {
//   Posting.find({posting: req.params.postId})
//     if (!posting) {
      
//     } else {
//       // posting exists
//     }
// })

module.exports = router;