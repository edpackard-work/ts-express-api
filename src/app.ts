import express, {Application} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DemoRouter from './router/DemoRouter';
import ProductRouter from './router/ProductRouter';


const app:Application = express();

dotenv.config()
const dbConnectionString = process.env.MONGODB_URI as string;

const demoRouter = new DemoRouter;
const productRouter = new ProductRouter;

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
app.use('/api/v1/products', productRouter.getRouter());

export default app;