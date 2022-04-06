import { app } from '../app'
import { productModel } from '../model/Product'

import * as db from '../__test__/setup/db'
import request from 'supertest'

const productData = {
  name: 'Pen',
  description: "it's a pen",
  stock: 7,
  price: 11,
  category: 'stationery',
}

describe('test for /:id GET route', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('gets a product with a valid id', async () => {
    const validProduct = new productModel(productData)
    const savedProduct = await validProduct.save()

    const response = await request(app).get(
      `/api/v1/products/${savedProduct._id}`
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body.name).toEqual('Pen')
    expect(response.body.description).toEqual("it's a pen")
    expect(response.body.stock).toEqual(7)
    expect(response.body.price).toEqual(11)
    expect(response.body.category).toEqual('stationery')
  })

  it('returns correct status code and message for invalid input', async () => {
    const response = await request(app).get('/api/v1/products/35354')

    expect(response.statusCode).toEqual(404)
    expect(response.text).toEqual(
      'Unable to find matching document with id: 35354'
    )
  })
})
