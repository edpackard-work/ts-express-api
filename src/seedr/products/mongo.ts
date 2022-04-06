import mongoose from 'mongoose'
import ObjectId from 'bson-objectid'
import { Product, productModel } from '../../model/Product'

type BulkInsertableProduct = Omit<Product, '_id'> & { _id: ObjectId }
export const formatProductsForBulkInsert = (
  products: Product[]
): BulkInsertableProduct[] =>
  products.map(({ _id, ...rest }) => ({
    _id: ObjectId(_id),
    ...rest,
  }))

export const seedProducts = async (products: Product[]) => {
  await mongoose.connection.db
    .collection<BulkInsertableProduct>('products')
    .insertMany(formatProductsForBulkInsert(products))
}

export const deleteAllProducts = async () => {
  await productModel.deleteMany({})
}
