const {checkSchema, body} = require('express-validator')

const {handleValidationErrors} = require('../utils/validation.util')
const {parseArray} = require('../utils/general.util')

const usersValidation = {}

usersValidation.create = [
  checkSchema({
 
    username: {
      isString: true,
      isLength: {
        errorMessage: "username must be longer than 5 characters",
        options:{min:5}
      },
      notEmpty: {
        errorMessage: "username must be entered"
      }
    },

    password: {
      trim: true,
      notEmpty: true,
      isStrongPassword: {
        errorMessage: "choose a better password"
      },
    },

    email: {
      normalizeEmail: true,
      isEmail: {
        errorMessage: "this email address is invalid"
      },
    },

    mobile: {
      isMobilePhone: 'fa-IR'
    },

    access: {
      custom: {
        options: async (value, {req}) => {
          let allowedAccessControls = ['add', 'delete', 'edit']
          let enteredAccessControl = await parseArray(value)
          
          let isAccessValid = enteredAccessControl.every(
            access => allowedAccessControls.indexOf(access) !== -1
          )
            
          if(isAccessValid) return true
          throw new Error('your entered access control is invalid')
        }
      }
    },
  }),

  handleValidationErrors]

// ========================== using chanining to validate update inputs 
usersValidation.update = [
  body('username').optional()
    .isString().withMessage("username must be string").notEmpty().withMessage("username must be entered").isLength({min: 5}),
  
  body('password').optional()
    .trim().notEmpty().isStrongPassword({minLength: 5}).withMessage("you should choose a stronger password"),
  
  body('email').optional().normalizeEmail().isEmail().withMessage("this is an invalid email address"),
  
  body('mobile').optional().isMobilePhone('fa-IR', {strict: true}),

  body('access').optional().custom(async (value, {req}) => {

    let allowedAccessControls = ['add', 'delete', 'edit']
    let enteredAccessControl = await parseArray(value)
    
    let isAccessValid = enteredAccessControl.every(
      access => allowedAccessControls.indexOf(access) !== -1
    )
      
    if(isAccessValid) return true
    throw new Error('your entered access control is invalid')

  }), 

handleValidationErrors]


  module.exports = usersValidation