import { Request, Response } from 'express'
import { productModel } from '../model/Product'

import request from "supertest";
import { app } from '../app'

import mongoose from 'mongoose';

import { db } from "../set/db";

const productData = {
  name: "Pen",
  description: "it's a pen",
  stock: 7,
  price: 11,
  category: "stationery",
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});


describe('test for /:id GET route', () => {

  it('gets a product with a valid id', async () => {
    const validProduct = new productModel(productData);
    const savedProduct = await validProduct.save();
    expect(savedProduct._id).toBeDefined();
    console.log(savedProduct._id);
    // expect(response.statusCode).toEqual(200);
    // expect(response.body).toEqual("Unable to find matching document with id: 35354");
    })

//   it('returns correct status code and message for invalid input', async () => {
//     const result = await request(app).get("/:id");
//     console.log(result);
//     expect(result.statusCode).toEqual(404);
//     expect(result.body).toEqual("Unable to find matching document with id: 35354");
//   })
})
