import { Request, Response } from 'express';

import DemoController from '../controller/DemoController';
import DemoDatabase from '../database/DemoDatabase';

let controller: DemoController;

jest.mock('../database/DemoDatabase');
const mockedDatabase = (DemoDatabase as unknown) as jest.Mock<DemoDatabase>;
let mockDb: DemoDatabase;

let mockRequest: Request;
let mockResponse: Response;
let mockStatus: jest.Mock;
let mockJson: jest.Mock;

beforeEach(() => {
    mockDb = new mockedDatabase;
    controller = new DemoController(mockDb);
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn().mockReturnThis();
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    } as Partial<Response> as Response;
});

afterEach(() => { 
    jest.resetAllMocks();
})

describe('getMessage', () => {
    it('successfully returns a message from the db', () => {
        jest.spyOn(mockDb, 'getMessageData').mockReturnValueOnce('Test Message');
        controller.getMessage(mockRequest, mockResponse);
        expect(mockDb.getMessageData).toHaveBeenCalledTimes(1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith('Test Message');
    })
})
