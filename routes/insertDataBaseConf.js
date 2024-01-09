/*const mongoose = require('mongoose')

const Exercise = require('../models/Exercise.model')
const newExercise = {
  name: 'Yoke Walk',
  force: 'p',
  level: 'intermediate',
  mechanic: 'compound',
  equipment: 'other',
  primaryMuscles: ['quadriceps'],
  secondaryMuscles: [
    'abdominals',
    'abductors',
    'adductors',
    'calves',
    'glutes',
    'hamstrings',
    'lower back',
  ],
  instructions: [
    'The yoke is usually done with a yoke apparatus, but is sometimes seen with refrigerators or other heavy objects.',
    'Begin by racking the apparatus across the back of the shoulders. With your head looking forward and back arched, lift the yoke by driving through the heels.',
    'Begin walking as quickly as possible using short, quick steps. You may hold the side posts of the yoke to help steady it and hold it in position. Continue for the given distance as fast as possible, usually 75-100 feet.',
  ],
  category: 'strongman',

  id: 'Yoke_Walk',
}
console.log(newExercise)
async function createExercise() {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitwork'
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Before Exercise.create')
    const createdExercise = await Exercise.create(newExercise)
    console.log('After Exercise.create')
    console.log('Exercise created successfully:', createdExercise)
  } catch (error) {
    console.error('Error creating exercise:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Call the function to create the exercise
createExercise()*/
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Exercise = require('../models/Exercise.model') // Adjust the path based on your project structure
const dataFolderPath = path.join(__dirname, '..', 'data') // Go up one level to 'fitWork' and then into 'data'

async function insertExercises() {
  //console.log(dataFolderPath)

  // Read all files in the data folder
  const files = fs.readdirSync(dataFolderPath)

  return files
    .filter(file => path.extname(file).toLowerCase() === '.json')
    .map(file => path.join(dataFolderPath, file))
}

// Wrap the code in an IIFE (Immediately Invoked Function Expression)
const importDataFromJSON = async () => {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitwork'
  try {
    await mongoose.connect(MONGO_URI)

    const jsonFiles = await insertExercises()

    for (const jsonFile of jsonFiles) {
      const rawData = await fs.promises.readFile(jsonFile, 'utf-8')
      const data = JSON.parse(rawData)

      // Ensure data is an array
      const dataArray = Array.isArray(data) ? data : [data]

      // Take only the first exercise from the array
      //const firstExercise = dataArray[0]

      console.log('Data to be inserted:', dataArray)

      // Use the Exercise model to insert data
      await Exercise.create(dataArray)

      console.log(`Data from ${jsonFile} inserted successfully.`)
    }
  } catch (error) {
    console.error('Error importing data:', error)
    console.error('Stack trace:', error.stack)
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close()
  }
}

// Import data from JSON files to the Exercise model
importDataFromJSON()
