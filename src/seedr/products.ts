import { BulkResponse } from '@elastic/elasticsearch/lib/api/types'
import mongoose, { InsertManyResult } from 'mongoose'
import ObjectId from 'bson-objectid'
import { client as elasticClient } from '../elastic'
import { Product } from '../model/Product'
import { randomTitle, randomProse, randomNumber, selectRandom } from './utils'

const categories = [randomTitle(), randomTitle(), randomTitle(), randomTitle()]

const randomProduct = (): Product => ({
  _id: new ObjectId().toHexString(),
  name: randomTitle(),
  description: randomProse(),
  price: randomNumber({
    min: 10,
    max: 200,
    postfixPool: [0.99, 0.5, 0.49, 0.9],
  }),
  stock: randomNumber({ min: 10, max: 100 }),
  category: selectRandom(categories),
})

const randomProducts = (amount: number): Product[] =>
  Array(amount)
    .fill(null)
    .map(() => randomProduct())
// @ts-ignore
export const seedProducts = (
  amount: number
): [Promise<InsertManyResult<Product>>, Promise<BulkResponse>] => {
  const products = randomProducts(amount)
  const mongoInsert = mongoose.connection.db
    .collection<Product>('products')
    .insertMany(products)
  const elasticInsert = elasticClient.bulk({
    body: products.flatMap((product) => {
      const { _id, ...rest } = product
      return [{ create: { _index: 'products' } }, { id: _id, ...rest }]
    }),
  })
  return [mongoInsert, elasticInsert]
}
