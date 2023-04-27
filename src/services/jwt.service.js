const jwt = require("jsonwebtoken");

const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessExpiredMilliseconds: process.env.JWT_ACCESS_TOKEN_EXPIRED_MILLISECONDS, // 1 hour
};

// Create Access Token
exports.createAccessToken = (userId, role) => {
  try {
    return jwt.sign({ userId, role }, jwtConfig.accessTokenSecret, {
      expiresIn: new Date(jwtConfig.accessExpiredMilliseconds).getTime(),
    });
  } catch (error) {
    throw error;
  }
};

// Create Refresh Token
exports.createRefreshToken = (userId, role) => {
  try {
    return jwt.sign({ userId, role }, jwtConfig.refreshTokenSecret);
  } catch (error) {
    throw error;
  }
};

// Verify Access Token
exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.accessTokenSecret);
  } catch (error) {
    throw error;
  }
};

// Verify Refresh Token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshTokenSecret);
  } catch (error) {
    throw error;
  }
};
