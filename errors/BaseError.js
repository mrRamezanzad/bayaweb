const BaseError = class extends Error {
  constructor(name, statusCode, message){
    super(message)
    Object.setPrototypeOf (this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}

module.exports = BaseError