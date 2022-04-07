import { randomProducts } from './randomProducts'
import {
  seedProducts as seedElasticProducts,
  deleteAllProducts as deleteAllElasticProducts,
} from './elastic'
import {
  seedProducts as seedMongoProducts,
  seedProductCategories as seedMongoProductCategories,
  deleteAllProducts as deleteAllMongoProducts,
  deleteAllProductCategories,
} from './mongo'

export const deleteAllProducts = async () => {
  await deleteAllElasticProducts()
  await deleteAllMongoProducts()
}

export const seedProducts = async (amount: number): Promise<void> => {
  const [products, productCategories] = randomProducts(amount)

  await deleteAllProducts()
  await deleteAllProductCategories()

  try {
    console.log('Seeding products in Mongo')
    await seedMongoProducts(products)
    console.log('Seeding product categories in Mongo')
    await seedMongoProductCategories(productCategories)
    console.log('Seeding products in Elastic')
    await seedElasticProducts(products)
  } catch (error) {
    console.log(`Something went wrong during seeding`)
    console.log((error as Error)?.message)
    console.log('Unwinding seeded data')
    await deleteAllProducts()
    await deleteAllProductCategories()
  }
}
