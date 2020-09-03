const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const Posting = require("../../models/Posting");
const validatePostingInput = require("../../validation/postings");
const multer = require("multer");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;
// Middleware for postman form-data
const upload = multer();

// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

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

// protects the route
router.post("/", upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { isValid, errors } = validatePostingInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }

    uploadImage(req.file).then(data => {
      // console.log(req.file)
      console.log(data)
        const uploadedImageURL = data.Location;

        const newPosting = new Posting({
          title: req.body.title,
          image: uploadedImageURL,
          description: req.body.description,
          price: req.body.price,
          zipCode: req.body.zipCode,
          tags: req.body.tags,
        });

        newPosting.save().then(posting => res.json(posting))
      }).catch(err => res.status(400).json(err))

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