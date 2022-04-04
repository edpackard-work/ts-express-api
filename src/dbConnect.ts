import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const dbConnectionString = process.env.MONGODB_URI as string

export const dbConnect = async () => {
  try {
    await mongoose.connect(dbConnectionString)
    console.log('Connected to MongoDB')
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log('Could not connect to Database: ' + message)
  }
}
