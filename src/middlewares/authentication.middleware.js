const jwtTokenService = require("../services/jwt.service");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { UnauthorizeError, ForbiddenError } = require("../errors/Errors");

// Authentication Token
exports.authJwtToken = (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return next(new UnauthorizeError());
    const decodedToken = jwtTokenService.verifyAccessToken(token);
    if (!decodedToken) return next(new UnauthorizeError("Error decodedToken"));
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error Auth: ", error instanceof JsonWebTokenError);

    // Refresh Token
    // if (error.name === "TokenExpiredError") {
    //   const refreshToken = req.headers["refresh-token"];
    //   if (!refreshToken)
    //     return next(new UnauthorizeError("Refresh Token Required"));
    //   const decodedToken = jwtTokenService.verifyRefreshToken(refreshToken);
    //   if (!decodedToken) return next(new UnauthorizeError());
    //   req.refreshToken = decodedToken;
    //   next();
    // }

    if (error instanceof TokenExpiredError) {
      return next(new UnauthorizeError("Token Expired"));
    }
    if (error instanceof JsonWebTokenError) {
      return next(new UnauthorizeError("Invalid Token 2"));
    }
  }
};

// Check Role
exports.authJwtRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === "admin") {
      return next();
    }
    if (req.user.role !== role) {
      return next(new ForbiddenError("You do not have access to this route"));
    } else {
      next();
    }
  };
};
