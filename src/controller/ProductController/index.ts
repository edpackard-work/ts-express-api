import { Request, Response } from 'express'
import { Product, productModel } from '../../model/Product'
import { client as elasticClient } from '../../elastic'
import { buildQuery } from './buildQuery'

export class ProductController {
  async getProductById(req: Request, res: Response) {
    const id = req.params.id
    try {
      const product = await productModel
        .findOne({ _id: id })
        .populate('categories')
      if (product) {
        return res.status(200).json(product)
      }
    } catch (error) {
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`)
    }
  }

  async getAllProducts(req: Request, res: Response) {
    const query = buildQuery(req)
    elasticClient
      .search<Product>(query)
      .then((resp) => {
        return res.status(200).json({
          products: resp.hits.hits,
        })
      })
      .catch((err: any) => {
        console.log(err)
        return res.status(500).json({
          msg: 'Error',
          err,
        })
      })
  }
}
