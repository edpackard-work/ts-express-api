import express, {Application} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DemoRouter from './router/DemoRouter';

const app:Application = express();

dotenv.config()
const dbConnectionString = process.env.MONGODB_URI as string;

const demoRouter = new DemoRouter;

(async () => {
    try {
        await mongoose.connect(dbConnectionString);
        console.log('Connected to MongoDB')
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error);
        console.log("Could not connect to Database: " + message)
    }
})();

app.use(express.json());

app.use('/demo', demoRouter.getRouter());

export default app;