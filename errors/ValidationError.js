const ApiError = require("./ApiError");

const ValidationError = class extends ApiError {
  constructor(name, statusCode, message) {
    super(name, statusCode, message)
  }

  extractMessage (err) {
   
  }

  static badRequest(err) {
    let message

    switch (err.code) {
      case 11000:
        message = `this ${Object.keys(err.keyValue)} is already taken.`
        break;
    
      default: 
        message = `please check your sending information\n ${err.message}`
        break;
    }

    return new ValidationError("BAD_REQUEST", 400, message)
  }
}

module.exports = ValidationError