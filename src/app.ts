import express, { Application } from 'express'
import ProductRouter from './router/ProductRouter'

export const app: Application = express()

const productRouter = new ProductRouter()

app.use(express.json())

app.use('/api/v1/products', productRouter.getRouter())

export default app
