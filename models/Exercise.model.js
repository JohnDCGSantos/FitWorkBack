const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const ExerciseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    force: {
      type: String,
    },
    level: {
      type: String,
    },
    mechanic: {
      type: String,
    },
    equipment: { type: String },
    primaryMuscles: { type: [String] },
    secondaryMuscles: { type: [String] },
    instructions: { type: [String] },
    category: { type: String },
    images: { type: [String] },
    id: { type: String },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Exercise = model('Exercise', ExerciseSchema)

module.exports = Exercise
