const express = require('express');
const router = express.Router();
const userModell = require('../models/user')
const userService = require('../services/user')
const {isPermittedToAdd, isPermittedToEdit, isPermittedToDelete} = require('../middlewares/permissions')

router.get('/', async (req, res, next) => {

  let users 
  try {
    users = await userService.findAll()
    res.send(users)

  } catch (err) {res.status(500).send(users)}
});

router.get('/:id', async (req, res, next) => {
  let userId = req.params.id
  let user 
  try {
    user = await userService.findOne({_id: userId})
    res.send(user)

  } catch (err) {res.status(500).send(err)}
});

router.patch('/:id', isPermittedToEdit, async (req, res, next) => {
  let userId = req.params.id
  let updateUserInfo = req.body
  if(updateUserInfo['access']) updateUserInfo.access = JSON.parse(updateUserInfo.access)
  try {
    updatedUser = await userService.update(userId, updateUserInfo)
    res.send({updated: updatedUser})
    
  } catch (err) {res.status(500).send(err)}

});

router.delete('/:id', isPermittedToDelete, async (req, res, next) => {
  let userId = req.params.id
  let isUserDeleted
  try {
    isUserDeleted = await userService.delete(userId)
    res.send({deleted: updatedUser})
    
  } catch (err){res.status(500).send(err)}
})

module.exports = router;
