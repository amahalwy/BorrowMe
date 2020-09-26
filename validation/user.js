const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateUserInput(data) {
  let errors = {};

  data.firstName = validText(data.firstName) ? data.firstName : "";
  data.lastName = validText(data.lastName) ? data.lastName : "";
  data.address = validText(data.address) ? data.address : "";
  data.city = validText(data.city) ? data.city : "";
  data.state = validText(data.state) ? data.state : "";
  data.zipCode = validText(data.zipCode) ? data.zipCode : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required.";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required.";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Adress field is required.";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required.";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required.";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zipcode field is required.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
