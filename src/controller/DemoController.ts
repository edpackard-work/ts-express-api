import { Request, Response } from 'express';

import DemoDatabase from '../database/DemoDatabase';

class DemoController {

    database: DemoDatabase;

    constructor (db: DemoDatabase) {
        this.database = db;
    };

    getMessage (_: Request, res: Response) {
        const message = this.database.getMessageData();
        return res.status(200).json(message);
    };

}

export default DemoController;