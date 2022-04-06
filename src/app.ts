import express, { Application } from 'express'
import DemoRouter from './router/DemoRouter'
import { ProductCategoryRouter } from './router/ProductCategoryRouter'
import ProductRouter from './router/ProductRouter'

export const app: Application = express()

const demoRouter = new DemoRouter()
const productRouter = new ProductRouter()
const productCategoryRouter = new ProductCategoryRouter()

app.use(express.json())

app.use('/demo', demoRouter.getRouter())
app.use('/api/v1/products', productRouter.getRouter())
app.use('/api/v1/product_categories', productCategoryRouter.getRouter())

export default app
