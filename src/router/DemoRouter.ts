import { Router } from 'express'
import DemoController from '../controller/DemoController'
import DemoDatabase from '../database/DemoDatabase'

class DemoRouter {
  private router: Router
  private controller: DemoController

  constructor(controller = new DemoController(new DemoDatabase())) {
    this.controller = controller
    this.router = Router()
    this.setUpRouter()
  }

  private setUpRouter() {
    this.router.get('/', (req, res) => {
      this.controller.getMessage(req, res)
    })
  }

  public getRouter() {
    return this.router
  }
}

export default DemoRouter
