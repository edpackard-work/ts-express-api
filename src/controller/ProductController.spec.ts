import request from 'supertest'
import { app } from '../app'
import { productModel } from '../model/Product'
import * as db from '../__test__/setup/db'
import { randomProducts } from '../seedr/products/randomProducts'

const [[productData]] = randomProducts(1)

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
    expect(response.body.name).toEqual(productData.name)
    expect(response.body.description).toEqual(productData.description)
    expect(response.body.stock).toEqual(productData.stock)
    expect(response.body.price).toEqual(productData.price)
  })

  it('returns correct status code and message for invalid input', async () => {
    const response = await request(app).get('/api/v1/products/35354')

    expect(response.statusCode).toEqual(404)
    expect(response.text).toEqual(
      'Unable to find matching document with id: 35354'
    )
  })
})
