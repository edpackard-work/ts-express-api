import mongoose from 'mongoose'

import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer

export const connect = async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
  // console.log('Mongo memory server connected')
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongo.stop()
  // console.log('Mongo memory server disconnected')
}

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
  // console.log('Mongo memory server db cleared')
}
