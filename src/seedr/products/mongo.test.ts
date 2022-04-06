import {
  deleteAllProducts,
  formatProductsForBulkInsert,
  seedProducts,
} from './mongo'
import { randomProducts } from './randomProducts'
import * as db from '../../__test__/setup/db'
import { productModel } from '../../model/Product'

describe('deleteAllProducts', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('deletes all products', async () => {
    const products = randomProducts(10)
    await seedProducts(products)
    const afterSeedingCount = await productModel.count()
    expect(afterSeedingCount).toBe(10)
    await deleteAllProducts()
    const afterDeletingCount = await productModel.count()
    expect(afterDeletingCount).toBe(0)
  })
})

describe('seedProducts', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('inserts the given products into the mongo db', async () => {
    const products = randomProducts(10)
    await seedProducts(products)
    const afterSeedingCount = await productModel.count()
    expect(afterSeedingCount).toBe(10)
    for (let product of products) {
      const { _id: generatedId, ...leanProduct } = product
      const leanDocument = (await productModel.findById(generatedId))?.toObject(
        { getters: true }
      )
      if (leanDocument === undefined) {
        throw new Error('Product document not found')
      }
      const { _id, id: _plainId, ...document } = leanDocument
      expect(document).toEqual(leanProduct)
    }
  })
})

describe('formatProductsForBulkInsert', () => {
  it("makes an array products who's _ids are ObjectIds", () => {
    const products = randomProducts(4)
    const formattedProducts = formatProductsForBulkInsert(products)
    formattedProducts.forEach((element, index) => {
      const { _id, ...correspondingProduct } = products[index]
      const { _id: objectId, ...insertableProduct } = element
      expect(objectId.toHexString()).toBe(_id)
      expect(correspondingProduct).toEqual(insertableProduct)
    })
  })
})
