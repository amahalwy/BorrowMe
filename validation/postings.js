const Validator = require('validator');
const validText = require('./valid-text');
const validArray = require('./valid-array');

module.exports = function validatePostingInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.description = validText(data.description) ? data.description : '';
  data.price = validText(data.price) ? data.price : '';
  data.zipCode = validText(data.zipCode) ? data.zipCode : '';
  // data.image = validText(data.image) ? data.image : '';
  data.authorId = validText(data.authorId) ? data.authorId : "";
  data.tags = validArray(data.tags.trim().split(","))
    ? data.tags.trim().split(",")
    : "";


  if (Validator.isEmpty(data.authorId)) {
    errors.user = "Owner id required.";
  }
  
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required.';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required.";
  }

  if (!Validator.isLength(data.description, {min: 8, max: 300})) {
    errors.description = "Description field should be minimum 8 characters and maximum 300 characters.";
  }

  // if (Validator.isEmpty(data.image)) {
  //   errors.image = "Image field is required.";
  // }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required.';
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zip code field is required.";
  }
  
  if (data.tags.length > 3) {
    errors.tags = "Tags field can't be more than 3."
  }

  if (data.tags[0] === "") {
    errors.tags = "Tags field can't be empty."
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
