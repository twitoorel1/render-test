const {
  NotFoundError,
  UnauthorizeError,
  BadRequestError,
  ForbiddenError,
  PaymentRequiredError,
} = require("./Errors");

function errorHandler(error, req, res, next) {
  const { message, note } = error;
  switch (error.constructor) {
    case BadRequestError:
      return res.status(400).send({ ok: false, message, note });

    case UnauthorizeError:
      return res.status(401).send({ ok: false, message, note });

    case PaymentRequiredError:
      return res.status(402).send({ ok: false, message, note });

    case ForbiddenError:
      return res.status(403).send({ ok: false, message, note });

    case NotFoundError:
      return res.status(404).send({ ok: false, message, note });

    default:
      return res
        .status(500)
        .send({ ok: false, message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
