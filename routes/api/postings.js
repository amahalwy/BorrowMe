const express = require("express");
const passport = require("passport");
const router = express.Router();
const validatePostingInput = require("../../validation/postings");
const Posting = require("../../models/Posting");
// const { restart } = require("nodemon");


router.get("/postings", (req, res) => {
  Posting.find()
    .sort({ date: -1 })
    .then(postings => res.json(postings))
    .catch(err => res.status(400).json(err));
})

router.get("/postings/:postingId", (req, res) => {
  Posting.find({posting: req.params.postingId })
    .then((posting) => res.json(posting))
    .catch((err) => res.status(400).json(err));
})

router.post("/postings",
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

// router.patch("/postings/:postingId", (req, res) => {
//   Posting.find({posting: req.params.postId})
//     if (!posting) {
      
//     } else {
//       // posting exists
//     }
// })

module.exports = router;