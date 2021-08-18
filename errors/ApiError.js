const BaseError = require("./BaseError")

const ApiError = class extends BaseError {
  constructor(name = "API Error", statusCode = 500, message) {
    super(name, statusCode, message)
    this.name = name
    this.statusCode = statusCode
  }

  static badRequest(message) {
    message = message.trim() || "check your data"
    return new ApiError("BAD_REQUEST", 400, message)
  }

  static unAuthorized(message) {
    message = message.trim() || "you should login first"
    return new ApiError("UNAUTHORIZED", 401, message)
  }

  static forbidden(message) {
    message = message.trim() || "you are not permitted"
    return new ApiError("FORBIDDEN", 403, message)
  }

  static notFound(message) {
    message = message.trim() || "couldn't find anything"
    return new ApiError("NOT_FOUND", 404, message)
  }

  static internal(message) {
    message = message.trim() || "our server is in problem"
    return new ApiError("INTERNAL_SERVER_ERROR", 500, message)
  }

  /** NOT RECEIVING PROPER ANSWER FROM UPPER SERVER */
  static  badGateway(message) {
    message = message.trim() || "upper server is not responding"
    return new ApiError("BAD_GATEWAY", 502, message)
  }

  /** ORVERLOADED SERVICE OR UNDER MAINTENANCE */
  static  unAvailabe(message) {
    message = message.trim() || "we are doing some maintenance"
    return new ApiError("SERVICE_UNAVAILABLE", 503, message)
  }

  /** LIKE BAD_GATEWAY WICH IS NOT RECIEVING RESPONSE IN ALLOWED TIME */
  static  gatewayTimeout(message) {
    message = message.trim() || "time to get response from another server has exceeded"
    return new ApiError("SERVICE_UNAVAILABLE", 504, message)
  }
}

module.exports = ApiError