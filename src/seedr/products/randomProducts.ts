import ObjectId from 'bson-objectid'
import { Product } from '../../model/Product'
import { randomTitle, randomProse, randomNumber, selectRandom } from '../utils'

const categories = [randomTitle(), randomTitle(), randomTitle(), randomTitle()]

export const randomProduct = (): Product => ({
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

export const randomProducts = (amount: number): Product[] =>
  Array(amount)
    .fill(null)
    .map(() => randomProduct())
