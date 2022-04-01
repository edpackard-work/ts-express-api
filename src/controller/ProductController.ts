import { Request, Response } from 'express';

class ProductController {

    getMessageById (req: Request, res: Response) {
        return res.status(200).send("Hello Product");
    };

}

export default ProductController;