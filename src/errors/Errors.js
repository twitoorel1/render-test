// Error 400
/**
 * Error: Bad Request 400
 * @param String custom message or message default error
 */
class BadRequestError extends Error {
  constructor(note) {
    super("Bad Request");
    this.note = note;
  }
}

// Error 401
/**
 * Error: Unauthorized 401
 * @param String custom message or message default error
 */
class UnauthorizeError extends Error {
  constructor(note) {
    super("Unauthorize");
    this.note = note;
  }
}

// Error 402
/**
 * Error: Payment Required 402
 * @param String custom message or message default error
 */
class PaymentRequiredError extends Error {
  constructor(note) {
    super("Unauthorize");
    this.note = note;
  }
}

// Error 403
/**
 * Error: Forbidden 403
 * @param String custom message or message default error
 */
class ForbiddenError extends Error {
  constructor(note) {
    super("Forbidden");
    this.note = note;
  }
}

// Error 404
/**
 * Error: Page Not Found 404
 * @param String custom message or message default error
 */
class NotFoundError extends Error {
  constructor(note) {
    super("Not Found");
    this.note = note;
  }
}

module.exports = {
  NotFoundError,
  UnauthorizeError,
  BadRequestError,
  ForbiddenError,
  PaymentRequiredError,
};
