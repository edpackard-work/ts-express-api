import { client } from '../../elastic'
import { Product } from '../../model/Product'

interface BulkInsertableProducts {
  body: Array<
    | {
        create: { _index: 'products' }
      }
    | (Omit<Product, '_id'> & { id: string })
  >
}
export const formatProductsForBulkInsert = (
  products: Product[]
): BulkInsertableProducts => ({
  body: products.flatMap((product) => {
    const { _id, ...rest } = product
    return [{ create: { _index: 'products' } }, { id: _id, ...rest }]
  }),
})

export const seedProducts = async (products: Product[]) => {
  await client.bulk(formatProductsForBulkInsert(products))
}

export const deleteAllProducts = async () => {
  await client.indices.delete({ index: 'products' })
}
