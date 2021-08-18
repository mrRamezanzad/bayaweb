const express = require('express');
const router = express.Router();

const usersService = require('../services/users.service')

const {isLoggedIn, isPermittedToAdd, isPermittedToEdit, isPermittedToDelete} = require('../middlewares/permissions')
const usersValidation = require('../validations/users.validation.js')
const {parseArray} = require('../utils/general.util')

router

.post('/', isLoggedIn, isPermittedToAdd, usersValidation.create, async (req, res, next) => {
  
/** check for input field passage and sanitizing access array fields */
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    ...(req.body['access']) && {access: await parseArray(req.body.access)}
  }
  try {
    const newUser = await usersService.create(userInfo)
    res.status(201).send(newUser)

  } catch (err) {next(err)}
})

.get('/', async (req, res, next) => {
  
  let users 
  try {
    users = await usersService.findAll()
    res.send(users)

  } catch (err) {next(err)}
})

.get('/:id', async (req, res, next) => {
  
  let userId = req.params.id
  let user 
  try {
    user = await usersService.findOne({_id: userId})
    res.send(user)

  } catch (err) {next(err)}
})

.patch('/:id', isPermittedToEdit, usersValidation.update, async (req, res, next) => {
  
/** check for input field passage and sanitizing access array fields */
  let userId = req.params.id
  let updateUserInfo = {
    ... req.body['username'] && {username: req.body.username},
    ... req.body['password'] && {password: req.body.password},
    ... req.body['mobile']   && {mobile: req.body.mobile},
    ... req.body['access']   && {access: await parseArray(req.body.access)},
    ... req.body['email']    && {email: req.body.email},
  }

  try {
    updatedUser = await usersService.update(userId, updateUserInfo)
    res.send({updated: updatedUser})
    
  } catch (err) {next(err)}
})

.delete('/:id', isPermittedToDelete, async (req, res, next) => {

  let userId = req.params.id
  let isUserDeleted
  try {
    isUserDeleted = await usersService.delete(userId)
    res.send({deleted: isUserDeleted})
    
  } catch (err) {next(err)}
})

module.exports = router;