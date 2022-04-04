import { Router } from 'express'
import ProductController from '../controller/ProductController'

class ProductRouter {
  private router: Router
  private controller: ProductController

  constructor(controller = new ProductController()) {
    this.controller = controller
    this.router = Router()
    this.setUpRouter()
  }

  private setUpRouter() {
    this.router.get('/:id', (req, res) => {
      this.controller.getProductById(req, res)
    })
  }

  public getRouter() {
    return this.router
  }
}

export default ProductRouter
