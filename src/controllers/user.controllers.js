const User = require("../models/user.model");
const { NotFoundError, ForbiddenError } = require("../errors/Errors");
const {
  SELECTED_USER_FIELDS,
  SELECTED_USER_FIELDS_ONLY_ADMINS,
} = require("../constants/user.constants");

/* Routes For All User */
exports.getUserById = async (req, res, next) => {
  const getUserById = await User.findById(req.params.id).select(
    SELECTED_USER_FIELDS
  );
  if (!getUserById) return next(new NotFoundError("User not found"));
  res.status(200).json(getUserById);
};

exports.deleteUserById = async (req, res, next) => {
  if (req.user.role === "admin" || req.user.userId === req.params.id) {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) return next(new NotFoundError());
    res.send("User has been deleted...");
  } else {
    next(new ForbiddenError("You can delete only your account!"));
  }
};

// exports.updateUserById = async (req, res, next) => {
//   if (req.user.role === "admin" || req.user.userId === req.params.id) {
//     const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!userUpdate) return next(new NotFoundError());
//     res.send("User has been updated...");
//   } else {
//     next(new ForbiddenError("You can update only your account!"));
//   }
// };

/* Routes For Only Admin */
exports.createNewUser = async (req, res, next) => {
  return res.redirect(307, "/auth/register");
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select(SELECTED_USER_FIELDS_ONLY_ADMINS);
  if (!users) return next(new NotFoundError("Not Found Users"));
  res.status(200).send(users);
};
