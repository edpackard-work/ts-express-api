import { Request, Response } from 'express'
import { productCategoryModel } from '../model/ProductCategory'

export class ProductCategoryController {
  async getAllProductCategories(_: Request, res: Response) {
    try {
      const productCategories = await productCategoryModel.find({})
      res.send(productCategories)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}
