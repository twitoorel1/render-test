// Role Users
exports.USER_ROLE = {
  user: "user",
  admin: "admin",
};

// Filed For All User Roles
exports.SELECTED_USER_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "username",
  "role",
  "location",
  "phoneNumber",
  "avatar",
].join(" ");

// Filed For Only Admins
exports.SELECTED_USER_FIELDS_ONLY_ADMINS = [
  "firstName",
  "lastName",
  "email",
  "username",
  "role",
  "location",
  "phoneNumber",
  "avatar",
  "createdAt",
  "updatedAt",
].join(" ");
