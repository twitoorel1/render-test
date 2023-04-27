const router = require("express").Router();
const authController = require("../controllers/authentication.controllers");
const catchAsyncError = require("../errors/catchAsyncError");
const { upload } = require("../middlewares/uploadImage.middleware");

router.post("/login", catchAsyncError(authController.login));
router.post(
  "/register",
  upload.single("profileImage"),
  catchAsyncError(authController.register)
);
router.post("/logout", catchAsyncError(authController.logout));
router.post("/isLogin", catchAsyncError(authController.isLogin));

router.post("/refresh-token");
router.post("/access-token");

module.exports = router;
