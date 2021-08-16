const {body, validationResult} = require('express-validator')

exports.create = [
  body('username')
    .isString().withMessage("username must be string").notEmpty().withMessage("username must be entered"),

  body('password')
    .trim().notEmpty().isStrongPassword({minLength: 5}).withMessage("you should choose a stronger password"),
  
  body('email').normalizeEmail().isEmail().withMessage("this is an invalid email address"),
  
  body('mobile').isMobilePhone({locale: '098'}),

  body('access')
    .notEmpty().toArray().isArray(), 
]