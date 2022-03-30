import express, {Application} from 'express';
import DemoRouter from './router/DemoRouter';

const app:Application = express();

const demoRouter = new DemoRouter;

app.use(express.json());

app.use('/demo', demoRouter.getRouter());

export default app;