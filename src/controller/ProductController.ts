import { Request, Response } from 'express';
import { productModel } from '../model/Product'

class ProductController {

    async getProductById (req: Request, res: Response) {
        const id = req.params.id;
        try {
        const product = await productModel.findOne({ "_id": id });
        if (product) {
        return res.status(200).json(product);
        } }catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }
    }

}

export default ProductController;
