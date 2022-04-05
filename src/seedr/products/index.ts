import { randomProducts } from './randomProducts'
import { 
  seedProducts as seedElasticProducts,
  deleteAllProducts as deleteAllElasticProducts
} from './elastic'
import { 
  seedProducts as seedMongoProducts,
  deleteAllProducts as deleteAllMongoProducts
} from './mongo'

export const deleteAllProducts = async () => {
  await deleteAllElasticProducts()
  await deleteAllMongoProducts()
}

export const seedProducts = async (
  amount: number
): Promise<void> => {
  const products = randomProducts(amount)

  await deleteAllProducts()
  
  try {
    console.log('Seeding products in Mongo')
    await seedMongoProducts(products)
    console.log('Seeding products in Elastic')
    await seedElasticProducts(products)
  } catch(error) {
    console.log(`Something went wrong during seeding`)
    console.log((error as Error)?.message)
    console.log('Unwinding seeded data')
    await deleteAllProducts()
  }
}
