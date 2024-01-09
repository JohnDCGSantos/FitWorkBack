const router = require('express').Router()
const Exercise = require('../models/Exercise.model')

router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercise.find()

    res.json(exercises) // Send the response once with all exercise names
  } catch (error) {
    next(error) // Pass the error to the error handling middleware
  }
})
router.get('/:exerciseId', async (req, res, next) => {
  try {
    const exercises = await Exercise.findById(req.params.exerciseId)

    res.json(exercises) // Send the response once with all exercise names
  } catch (error) {
    next(error) // Pass the error to the error handling middleware
  }
})

module.exports = router
