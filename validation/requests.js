const Validator = require("validator");
const validText = require("./valid-text");
const validArray = require("./valid-array");

module.exports = function validatePostingInput(data) {
  let errors = {};

  data.postingId = validText(data.postingId) ? data.postingId : "";
  data.requestorId = validText(data.requestorId) ? data.requestorId : "";
  data.startDate = validText(data.startDate) ? data.startDate : "";
  data.endDate = validText(data.endDate) ? data.endDate : "";

  if (Validator.isEmpty(data.postingId)) {
    errors.postingId = "Posting id field is required.";
  }

  if (Validator.isEmpty(data.requestorId)) {
    errors.requestorId = "Requestor id field is required.";
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Start date field is required.";
  }

  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "End date field is required.";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
