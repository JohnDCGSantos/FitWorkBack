const router = require('express').Router()
const User = require('../models/User.model')
router.get('/', async (req, res, next) => {
  const users = await User.find()
  res.send(users)
})

module.exports = router
