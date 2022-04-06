import {
  deleteAllProducts,
  formatProductsForBulkInsert,
  seedProducts,
} from './elastic'
import { client } from '../../elastic'
import { randomProducts } from './randomProducts'

jest.mock('../../elastic', () => {
  return {
    client: {
      bulk: jest.fn(),
      indices: {
        delete: jest.fn(),
      },
    },
  }
})

describe('deleteAllProducts', () => {
  it('deletes all products', async () => {
    await deleteAllProducts()
    expect(client.indices.delete).toHaveBeenCalledWith({ index: 'products' })
  })
})

describe('seedProducts', () => {
  it('calls the bulk api with a list of products', async () => {
    const [products] = randomProducts(1)
    const formattedProducts = formatProductsForBulkInsert(products)
    await seedProducts(products)
    expect(client.bulk).toHaveBeenCalledWith(formattedProducts)
  })
})

describe('formatProductsForBulkInsert', () => {
  it('makes an array of alternating operations and documents', () => {
    const [products] = randomProducts(4)
    const formattedProducts = formatProductsForBulkInsert(products)
    formattedProducts.body.forEach((element, index) => {
      if (index % 2 === 0) {
        expect(element).toEqual({ create: { _index: 'products' } })
      } else {
        const { _id, ...correspondingProduct } = products[Math.floor(index / 2)]
        const { id, ...insertableProduct } = element as any
        expect(id).toBe(_id)
        expect(correspondingProduct).toEqual(insertableProduct)
      }
    })
  })
})
