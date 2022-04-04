import express, { Application } from 'express'
import DemoRouter from './router/DemoRouter'
import ProductRouter from './router/ProductRouter'

export const app: Application = express()

const demoRouter = new DemoRouter()
const productRouter = new ProductRouter()

app.use(express.json())

app.use('/demo', demoRouter.getRouter())
app.use('/api/v1/products', productRouter.getRouter())

export default app
