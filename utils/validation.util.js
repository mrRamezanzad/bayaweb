const {validationResult} = require('express-validator')

/** this tool helps returning errors of middleware validation checks made by express-validator */
exports.handleValidationErrors= async (req, res, next) => {
  
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).send(errors.array())
  next()
}