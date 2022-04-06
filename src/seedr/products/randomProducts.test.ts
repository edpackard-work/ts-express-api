import {
  randomCategories,
  randomCategory,
  randomProduct,
  randomProducts,
} from './randomProducts'

describe('randomCategory', () => {
  it('returns a category with random attributes', () => {
    const category = randomCategory()
    expect(typeof category._id).toBe('string')
    expect(typeof category.name).toBe('string')
    expect(typeof category.description).toBe('string')
  })
})

describe('randomCategories', () => {
  it('returns an array of products with random attributes', () => {
    const categories = randomCategories(3)
    expect(categories.length).toBe(3)
    categories.forEach((category) => {
      expect(typeof category._id).toBe('string')
      expect(typeof category.name).toBe('string')
      expect(typeof category.description).toBe('string')
    })
    categories.every((category, index) => {
      expect(category._id !== categories?.[index - 1]?._id).toBe(true)
      expect(category.name !== categories?.[index - 1]?.name).toBe(true)
      expect(
        category.description !== categories?.[index - 1]?.description
      ).toBe(true)
    })
  })
})

describe('randomProduct', () => {
  it('returns a product with random attributes', () => {
    const categories = randomCategories(10)
    const product = randomProduct(categories)
    expect(typeof product._id).toBe('string')
    expect(typeof product.name).toBe('string')
    expect(typeof product.description).toBe('string')
    expect(typeof product.price).toBe('number')
    expect(typeof product.stock).toBe('number')
    product.categories.forEach(({ _id: productCategoryId }) => {
      expect(categories.some(({ _id }) => _id === productCategoryId)).toBe(true)
    })
  })
})

describe('randomProducts', () => {
  it('returns an array of products with random attributes', () => {
    const [products, categories] = randomProducts(3)
    expect(products.length).toBe(3)
    products.forEach((product) => {
      expect(typeof product._id).toBe('string')
      expect(typeof product.name).toBe('string')
      expect(typeof product.description).toBe('string')
      expect(typeof product.price).toBe('number')
      expect(typeof product.stock).toBe('number')
      product.categories.forEach(({ _id: productCategoryId }) => {
        expect(categories.some(({ _id }) => _id === productCategoryId)).toBe(
          true
        )
      })
    })
    products.every((product, index) => {
      expect(product._id !== categories?.[index - 1]?._id).toBe(true)
      expect(product.name !== categories?.[index - 1]?.name).toBe(true)
      expect(product.description !== categories?.[index - 1]?.description).toBe(
        true
      )
    })
  })
})
