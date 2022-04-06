import {
  deleteAllProductCategories,
  deleteAllProducts,
  formatProductCategoriesForBulkInsert,
  formatProductsForBulkInsert,
  seedProductCategories,
  seedProducts,
} from './mongo'
import { randomCategories, randomProducts } from './randomProducts'
import * as db from '../../__test__/setup/db'
import { productModel } from '../../model/Product'
import { productCategoryModel } from '../../model/ProductCategory'

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
    const [products] = randomProducts(10)
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
    const [products] = randomProducts(10)
    await seedProducts(products)
    const afterSeedingCount = await productModel.count()
    expect(afterSeedingCount).toBe(10)
    for (let product of products) {
      const {
        _id: generatedId,
        categories: generatedCategories,
        ...leanProduct
      } = product
      const leanDocument = (await productModel.findById(generatedId))?.toObject(
        { getters: true }
      )
      if (leanDocument === undefined) {
        throw new Error('Product document not found')
      }
      const {
        _id,
        id: _plainId,
        categories: documentCategories,
        ...document
      } = leanDocument
      expect(document).toEqual(leanProduct)
      // @ts-ignore 
      expect(documentCategories.map(({ _id }) => _id.toHexString())).toEqual(
        generatedCategories.map(({ _id }) => _id)
      )
    }
  })
})

describe('formatProductsForBulkInsert', () => {
  it("makes an array products who's _ids are ObjectIds", () => {
    const [products, categories] = randomProducts(4)
    const formattedProducts = formatProductsForBulkInsert(products)
    formattedProducts.forEach((element, index) => {
      const {
        _id,
        categories: _rawCategories,
        ...correspondingProduct
      } = products[index]
      const {
        _id: objectId,
        categories: insertableCategories,
        ...insertableProduct
      } = element
      expect(objectId.toHexString()).toBe(_id)
      expect(correspondingProduct).toEqual(insertableProduct)
      insertableCategories.forEach((insertableId) => {
        categories.some(({ _id }) => _id === insertableId.toHexString())
      })
    })
  })
})

describe('deleteAllProductCategories', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('deletes all product categories', async () => {
    const categories = randomCategories(10)
    await seedProductCategories(categories)
    const afterSeedingCount = await productCategoryModel.count()
    expect(afterSeedingCount).toBe(10)
    await deleteAllProductCategories()
    const afterDeletingCount = await productCategoryModel.count()
    expect(afterDeletingCount).toBe(0)
  })
})

describe('seedProductCategories', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })
  it('inserts the given categories into the mongo db', async () => {
    const categories = randomCategories(10)
    await seedProductCategories(categories)
    const afterSeedingCount = await productCategoryModel.count()
    expect(afterSeedingCount).toBe(10)
    for (let category of categories) {
      const { _id: generatedId, ...leanCategory } = category
      const leanDocument = (
        await productCategoryModel.findById(generatedId)
      )?.toObject({ getters: true })
      if (leanDocument === undefined) {
        throw new Error('Product document not found')
      }
      const { _id, id: _plainId, ...document } = leanDocument
      expect(document).toEqual(leanCategory)
    }
  })
})

describe('formatProductCategoriesForBulkInsert', () => {
  it("makes an array categories who's _ids are ObjectIds", () => {
    const categories = randomCategories(4)
    const formattedCategories = formatProductCategoriesForBulkInsert(categories)
    formattedCategories.forEach((element, index) => {
      const { _id, ...correspondingProduct } = categories[index]
      const { _id: objectId, ...insertableCategory } = element
      expect(objectId.toHexString()).toBe(_id)
      expect(correspondingProduct).toEqual(insertableCategory)
    })
  })
})
