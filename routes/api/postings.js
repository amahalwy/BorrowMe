const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
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
  Posting.findById(req.params.id)
    .then(posting => {res.json(posting)} 
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
      price: req.body.price,
      zipCode: req.body.zipCode,
      tags: req.body.tags
    })

    newPosting.save()
    .then(posting => res.json(posting))
    .catch(err => res.status(400).json(err));
  }
)

// update

router.patch("/:postingId", passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { isValid, errors } = validatePostingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors)
    }

    // const posting = new Posting({
    //   title: req.body.title,
    //   image: req.body.image,
    //   description: req.body.description,
    //   price: req.body.price,
    //   zipCode: req.body.zipCode,
    // });
    // let updatedPosting = Object.assign(posting)

    Posting.findOne(req.body._id)
      .then((posting) => {
        posting.title = req.body.title;
        posting.description = req.body.description;
        posting.price = req.body.price;
        posting.zipCode = req.body.zipCode;
        posting.image = req.body.image;
        posting.save()
          .then(savedPosting => res.json(savedPosting))
          .catch(err => res.json(err))
      })

  });

  // delete
  router.delete('/:id', 
    (req, res) => {
      Posting.deleteOne({_id: req.params.id})
        .then(() => {
          res.json("Posting deleted successfully!")
        })
        .catch(err => res.status(400).json(err))
    }
  )

module.exports = router;