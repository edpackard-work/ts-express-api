import request from 'supertest'
import { app } from '../app'
import * as db from '../__test__/setup/db'
import { randomCategories } from '../seedr/products/randomProducts'
import { seedProductCategories } from '../seedr/products/mongo'
import { ProductCategory } from '../model/ProductCategory'

const categories = randomCategories(10)

describe('GET /api/v1/product_categories/', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('returns all product categories', async () => {
    await seedProductCategories(categories)

    const response = await request(app).get(
      `/api/v1/product_categories/`
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBe(10)
    response.body.forEach(({ name }: ProductCategory) => {
      expect(categories.some(category => category.name === name)).toBe(true)
    })
  })
})
