const BaseError = require("../errors/BaseError")

module.exports = (err, req, res, next) => {
  if(err instanceof BaseError)
   return res.status(err.statusCode).json({
      error: err.name,
      status: err.statusCode,
      description: err.message
    })
  next(err)
}