const User = require("../models/user.model");
const { NotFoundError, UnauthorizeError } = require("../errors/Errors");
const RequestValidationService = require("../services/request-validation.service");
const { defaultResponse } = require("../services/user.service");
const JwtTokenService = require("../services/jwt.service");
const { SELECTED_USER_FIELDS } = require("../constants/user.constants");

// Login User
exports.login = async (req, res, next) => {
  try {
    await RequestValidationService.loginValidation(req.body, next);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return next(new NotFoundError("Username Or Password is Not Valid"));
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return next(new NotFoundError("Username Or Password is Not Valid"));

    const sendResponse = await defaultResponse(req);
    res.status(200).send(sendResponse);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Register User
exports.register = async (req, res, next) => {
  try {
    await RequestValidationService.registerValidation(req.body, next);
    if (!req.file) return next(new UnauthorizeError("Please upload an image")); // Stop For Dev Mode
    const { path: image } = req.file;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new UnauthorizeError("Email Already Exists"));

    const newUser = await User.create({
      ...req.body,
      profileImage: image.replace("\\", "/"),
    });

    //   const sendResponse = await defaultResponse(req);
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Logout User
exports.logout = async (req, res, next) => {
  const { token } = req.body;
  const user = await User.findOne({ jwt_ac_token: token });
  if (!user) next(new NotFoundError());
  user.jwt_ac_token = undefined;
  user.save();
  res.status(200).send("You have been logged out");
};

// Check IsLogin
exports.isLogin = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token;
    if (!token) return next(new UnauthorizeError("Token is required"));
    const decoded = JwtTokenService.verifyAccessToken(token);
    if (!decoded) return next(new UnauthorizeError("Token is invalid"));
    const { userId } = decoded;
    const user = await User.findById(userId).select(SELECTED_USER_FIELDS);
    res.status(200).send(user);
  } catch (error) {
    next(new UnauthorizeError());
  } finally {
    // working with error and try
  }
};
