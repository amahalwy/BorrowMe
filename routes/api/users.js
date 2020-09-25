const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Posting = require('../../models/Posting');
const Booking = require("../../models/Booking");
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
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

router.get("/:userId",
  passport.authenticate("jwt", { session: false }),  
  (req, res) => {
    User.findOne({ _id: req.params.userId })
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  }
);

// Users' postings
router.get(
  "/:userId/postings",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posting.find({ ownerId: req.params.userId })
      .then((postings) => res.json(postings))
      .catch((err) => res.status(400).json(err));
  }
);

// Users' requests (as requestor)
router.get(
  "/:userId/requests/requestor",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.find({ requestorId: req.params.userId })
      .then((requests) => res.json(requests))
      .catch((err) => res.status(400).json(err));
  }
);

// Users' requests (as receiver)
router.get(
  "/:userId/requests/receiver",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.find({ receiverId: req.params.userId })
      .then((requests) => res.json(requests))
      .catch((err) => res.status(400).json(err));
  }
);

// Users' bookings
router.get(
  "/:userId/bookings/owner",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ ownerId: req.params.userId })
      .then((bookings) => res.json(bookings))
      .catch((err) => res.status(400).json(err));
  }
);

router.get(
  "/:userId/bookings/renter",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ requestorId: req.params.userId })
      .then((bookings) => res.json(bookings))
      .catch((err) => res.status(400).json(err));
  }
);

// Private auth route
router.get('/current', 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      address: req.user.address,
      city: req.user.city,
      state: req.user.state,
      profilePhoto: req.user.profilePhoto,
      zipCode: req.user.zipCode,
      postings: req.user.postings
    });
})

// Signup user
router.post('/signup', (req, res) =>{
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({email: "User already registered with this email."})
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        profilePhoto: "https://borrowme-pro.s3.us-east-2.amazonaws.com/6c40245f-69eb-40e1-be43-ce2476ecc72c",
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              
              const payload = { id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                profilePhoto: user.profilePhoto

                              };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch((err) => res.status(400).json(err));
        });
      });
    }
  })
})

// Login user 
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist'});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {

            const payload = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              address: user.address,
              city: user.city,
              state: user.state,
              zipCode: user.zipCode,
              profilePhoto: user.profilePhoto,
              postings: user.postings
            };

            jwt.sign( payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = 'Incorrect password' 
            return res.status(400).json(errors);
          }
        })
    })
})

// Patching for profile picture only
router.put(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    if (req.file === undefined) {
      User.findOne({ email: req.body.email })
        .then((user) => {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.address = req.body.address;
          user.city = req.body.city;
          user.state = req.body.state;
          user.zipCode = req.body.zipCode;
          user.profilePhoto = req.body.file;

          user
            .save()
            .then((savedUser) => res.json(savedUser))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json(err));
    } else {

      uploadImage(req.file)
      .then(data => {
        const uploadedImageURL = data.Location;
        User.findOne({ email: req.body.email })
          .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zipCode = req.body.zipCode;
            user.profilePhoto = uploadedImageURL;
            
            user.save()
            .then((savedUser) => res.json(savedUser))
            .catch((err) => res.json(err));
          })
          .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
    }
  }
);

// router.delete('/users/:userId')


module.exports = router;