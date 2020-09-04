const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require("../../config/keys");
const passport = require("passport");
const jwt = require('jsonwebtoken');
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

// Private auth route
router.get('/current', 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      email: req.user.email,
      address: req.user.address,
      city: req.user.city,
      state: req.user.state,
      zipCode: req.user.zipCode
    });
})


// Look at signup

// Signup user
router.post('/signup', (req, res) =>{
  const { errors, isValid } = validateSignupInput(req.body);

  // debugger 
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
        profilePhoto: ''
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              
              const payload = { id: user.id, email: user.email };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
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

            // Dictate response attributes here (jbuilder)

            const payload = { id: user.id, email: user.email, firstName: user.firstName };

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

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    uploadImage(req.file)
      .then((data) => {
        // console.log(req.file)
        console.log(data);
        const uploadedImageURL = data.Location;

        const newPosting = new Posting({
          title: req.body.title,
          image: uploadedImageURL,
          description: req.body.description,
          price: req.body.price,
          zipCode: req.body.zipCode,
          tags: req.body.tags,
        });

        newPosting.save().then((posting) => res.json(posting));
      })
      .catch((err) => res.status(400).json(err));
  }
);



// router.post('/:id', (req, res) => {
//   console.log(req);
//   User.findOne({ email: req.body.email })
//   .then((user) => {
//     if (!user) {
//       return res.status(400).json({ email: "User does not exist." });
//     } else {
//       const newUser = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         password2: req.body.password2,
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         zipCode: req.body.zipCode,
//         profilePhoto: "",
//       });
//     }
//   });
// })

// router.delete('/users/:userId')


module.exports = router;