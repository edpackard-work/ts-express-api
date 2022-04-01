import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const mongo = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongo.getUri();
    await mongoose.connect(uri);
};

module.exports.closeDatabase = async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
};

module.exports.clearDatabase = async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
};

