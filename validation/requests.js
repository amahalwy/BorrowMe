const Validator = require("validator");
const validText = require("./valid-text");
const validArray = require("./valid-array");

module.exports = function validatePostingInput(data) {
  let errors = {};

  data.postingId = validText(data.postingId) ? data.postingId : "";
  data.requestorId = validText(data.requestorId) ? data.requestorId : "";
  data.requestDates = validArray(data.requestDates) ? data.requestDates : "";

  if (Validator.isEmpty(data.postingId)) {
    errors.postingId = "Posting id field is required.";
  }

  if (Validator.isEmpty(data.requestorId)) {
    errors.requestorId = "Requestor id field is required.";
  }

  if (Validator.isEmpty(data.requestDates)) {
    errors.requestDates = "Request dates field is required.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
