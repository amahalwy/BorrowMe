const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePostingInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.description = validText(data.description) ? data.description : '';
  data.zipCode = validzipCode(data.zipCode) ? data.zipCode : '';
  data.image = validimage(data.image) ? data.image : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description= "Description field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = 'zipCode field is required';
  }

  if (Validator.isLength(data.description, {min: 8, max: 300})) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
