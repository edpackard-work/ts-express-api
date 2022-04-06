import { Router } from 'express'
import { ProductCategoryController } from '../controller/ProductCategoryController'

export class ProductCategoryRouter {
  private router: Router
  private controller: ProductCategoryController

  constructor(controller = new ProductCategoryController()) {
    this.controller = controller
    this.router = Router()
    this.setUpRouter()
  }

  private setUpRouter() {
    this.router.get('/', (req, res) => {
      this.controller.getAllProductCategories(req, res)
    })
  }

  public getRouter() {
    return this.router
  }
}
