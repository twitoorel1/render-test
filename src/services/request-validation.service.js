const {
  loginRequestSchema,
  registerRequestSchema,
} = require("../validators/schema/authRequests.schema");
const requestValidator = require("../validators/request.validator");

exports.loginValidation = async (requestBody, nextFunction) => {
  try {
    await requestValidator(loginRequestSchema, requestBody, nextFunction);
  } catch (error) {
    console.log("Login Validation Error: ", error.message);
  }
};

exports.registerValidation = async (requestBody, nextFunction) => {
  try {
    await requestValidator(registerRequestSchema, requestBody, nextFunction);
  } catch (error) {
    console.log("Register Validation Error: ", error.message);
  }
};
