const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const Posting = require("../../models/Posting");
const User = require("../../models/User");
const validatePostingInput = require("../../validation/postings");
const multer = require("multer");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;
const fs = require("fs");


// Middleware for postman form-data
const upload = multer();

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

const uploadImage = (file) => {
  const params = {
    Bucket: keys.S3Bucket,
    Key: uuidv4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  const uploadPhoto = s3.upload(params).promise();
  return uploadPhoto;
};

router.get("/", (req, res) => {
  Posting.find()
    .sort({ date: -1 })
    .then((postings) => res.json(postings))
    .catch((err) => res.status(400).json(err));
})

router.get("/:ownerId", (req, res) => {
  Posting.findById(req.params.id)
  .populate({
    path: 'userId',
    select: 'firstName'
  })
    .then(posting => {res.json(posting)} 
    , (err) => res.status(400).json(err));
})

router.get("/:userId", (req, res) => {
  console.log(req.params)
  Posting.find({ownerId: req.params.ownerId })
  .then(postings => res.json(postings))
  .catch(err => res.status(400).json(err))
})

// protects the route
router.post("/", upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostingInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log(req.body)
    // console.log("----")
    console.log(req.user)
    uploadImage(req.file).then(data => {
        const uploadedImageURL = data.Location;
    
        const newPosting = new Posting({
          title: req.body.title,
          image: uploadedImageURL,
          description: req.body.description,
          price: req.body.price,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          tags: req.body.tags,
          ownerId: req.user.id
        });

        // console.log(newPosting)
        // User.findOne({id: req.user.id})
        // .then(user => console.log(user))//user.postings.push(newPosting));
        
        newPosting
          .save()
          .then(posting => res.json(posting))
          .catch(err => res.json(err))

          // User.findOne({ id: req.user.id }).postings.then((user) =>
          //   user.postings.push(newPosting)
          // );

    }).catch(err => res.status(400).json(err))
  }
)

// update

router.patch(
  "/:postingId",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    uploadImage(req.file)
      .then((data) => {
        const uploadedImageURL = data.Location;

        console.log(req.body.price);
        Posting.findOne(req.body._id)
          // if currentUser === postingOwner
          // info to be used in the frontend
          .then((posting) => {
            posting.ownerId = req.body.ownerId;
            posting.title = req.body.title;
            posting.description = req.body.description;
            posting.price = req.body.price;
            posting.zipCode = req.body.zipCode;
            posting.image = uploadedImageURL;
            posting.tags = req.body.tags;
            posting
              .save()
              .then((savedPosting) => res.json(savedPosting))
              .catch((err) => res.json(err));
          });
      }).catch((err) => res.status(400).json(err));
  }
);

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