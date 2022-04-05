import { deleteAllProducts, seedProducts } from '.'
import { randomProducts } from './randomProducts'
import { 
  seedProducts as seedElasticProducts,
  deleteAllProducts as deleteAllElasticProducts
} from './elastic'
import { 
  seedProducts as seedMongoProducts,
  deleteAllProducts as deleteAllMongoProducts
} from './mongo'

jest.mock('./randomProducts', () => ({
  randomProducts: jest.fn(),
}))


jest.mock('./elastic', () => ({
  seedProducts: jest.fn(),
  deleteAllProducts: jest.fn()
}))

jest.mock('./mongo', () => ({
  seedProducts: jest.fn(),
  deleteAllProducts: jest.fn()
}))

describe('deleteAllProducts', () => {
  it('deletes all products in elastic and mongo', async () => {
    await deleteAllProducts()
    expect(deleteAllElasticProducts).toHaveBeenCalledTimes(1)
    expect(deleteAllMongoProducts).toHaveBeenCalledTimes(1)
  })
})

describe('seedProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('creates the desired number of products', async () => {
    await seedProducts(10)
    expect(randomProducts).toHaveBeenCalledTimes(1)
    expect(randomProducts).toHaveBeenCalledWith(10)
  })

  it('clears the dbs before starting', async () => {
    await seedProducts(10)
    expect(deleteAllElasticProducts).toHaveBeenCalledTimes(1)
    expect(deleteAllMongoProducts).toHaveBeenCalledTimes(1)  
  })

  it('seeds mongo and elastic', async () => {
    await seedProducts(10)
    expect(seedMongoProducts).toHaveBeenCalledTimes(1)
    expect(seedElasticProducts).toHaveBeenCalledTimes(1)
  })

  describe('if seeding mongo fails', () => {
    it('deletes everything', async () => {
      (seedMongoProducts as jest.Mock).mockRejectedValueOnce('error')
      await seedProducts(10)
      expect(deleteAllElasticProducts).toHaveBeenCalledTimes(2)
      expect(deleteAllMongoProducts).toHaveBeenCalledTimes(2)  
    })
  })

  describe('if seeding elastic fails', () => {
    it('deletes everything', async () => {
      (seedElasticProducts as jest.Mock).mockRejectedValueOnce('error')
      await seedProducts(10)
      expect(deleteAllElasticProducts).toHaveBeenCalledTimes(2)
      expect(deleteAllMongoProducts).toHaveBeenCalledTimes(2)  
    })
  })
})