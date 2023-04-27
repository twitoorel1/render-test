const yup = require("yup");
const { passwordRegex } = require("../../constants/regex.constants");

exports.loginRequestSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().matches(passwordRegex),
});

exports.registerRequestSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().matches(passwordRegex),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  username: yup.string().required(),
  phoneNumber: yup.string().required(),
});
