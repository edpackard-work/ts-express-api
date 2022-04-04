import { Router } from 'express'
import ProductController from '../controller/ProductController'
import { client as elasticClient } from '../elastic';

class ProductRouter {
  private router: Router
  private controller: ProductController

  constructor(controller = new ProductController()) {
    this.controller = controller
    this.router = Router()
    this.setUpRouter()
  }

  private setUpRouter() {
    this.router.get('/products/:id', (req, res) => {
      this.controller.getProductById(req, res)
    })

    this.router.get('/products', (req, res) => {
      let query: any = { 
        index: 'products',
      }
      elasticClient.search(query)
      .then((resp: { hits: { hits: any } })=>{
        console.log(query);
        return res.status(200).json({
          products: resp.hits.hits
        });
      })
      .catch((err: any)=>{
        console.log(err);
        return res.status(500).json({
          msg: 'Error',
          err
        });
      });
  });
  };


  public getRouter() {
    return this.router
  }
}

export default ProductRouter
