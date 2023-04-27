const router = require("express").Router();
const { NotFoundError } = require("../errors/Errors");
const errorHandler = require("../errors/errorHandler");
const { authJwtToken } = require("../middlewares/authentication.middleware");

router.use("/auth", require("./authentication.routes"));
router.use("/user", authJwtToken, require("./user.routes"));

// Error Not Found 404
router.all("*", (req, res, next) => {
  next(new NotFoundError());
});

router.use(errorHandler);

module.exports = router;
