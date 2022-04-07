import ObjectId from 'bson-objectid'
import { Product } from '../../model/Product'
import { ProductCategory } from '../../model/ProductCategory'
import {
  randomTitle,
  randomProse,
  randomNumber,
  selectRandomSubset,
} from '../utils'

export const randomCategory = () => ({
  _id: new ObjectId().toHexString(),
  name: randomTitle(),
  description: randomProse({ min: 1, max: 2 }),
})

export const randomCategories = (amount: number): ProductCategory[] =>
  Array(amount).fill(null).map(randomCategory)

export const randomProduct = (categories: ProductCategory[]): Product => ({
  _id: new ObjectId().toHexString(),
  name: randomTitle(),
  description: randomProse(),
  price: randomNumber({
    min: 10,
    max: 200,
    postfixPool: [0.99, 0.5, 0.49, 0.9],
  }),
  stock: randomNumber({ min: 10, max: 100 }),
  categories: selectRandomSubset(categories, { min: 1, max: 4 }),
})

export const randomProducts = (
  amount: number
): [Product[], ProductCategory[]] => {
  const categories = randomCategories(10)
  return [
    Array(amount)
      .fill(null)
      .map(() => randomProduct(categories)),
    categories,
  ]
}
