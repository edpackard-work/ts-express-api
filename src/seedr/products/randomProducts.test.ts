import { randomProduct, randomProducts } from './randomProducts'

describe('randomProduct', () => {
  it('returns a product with random attributes', () => {
    const product = randomProduct()
    expect(typeof product._id).toBe('string')
    expect(typeof product.name).toBe('string')
    expect(typeof product.description).toBe('string')
    expect(typeof product.price).toBe('number')
    expect(typeof product.stock).toBe('number')
    expect(typeof product.category).toBe('string')
  })
})

describe('randomProducts', () => {
  it('returns an array of products with random attributes', () => {
    const products = randomProducts(3)
    expect(products.length).toBe(3)
    products.forEach((product) => {
      expect(typeof product._id).toBe('string')
      expect(typeof product.name).toBe('string')
      expect(typeof product.description).toBe('string')
      expect(typeof product.price).toBe('number')
      expect(typeof product.stock).toBe('number')
      expect(typeof product.category).toBe('string')
    })
  })
})
