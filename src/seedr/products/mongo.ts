import mongoose from 'mongoose'
import ObjectId from 'bson-objectid'
import { Product, productModel } from '../../model/Product'
import { ProductCategory } from '../../model/ProductCategory';

type BulkInsertableProduct = Omit<Product, '_id' | 'categories'> & { _id: ObjectId; categories: ObjectId[] }
export const formatProductsForBulkInsert = (
  products: Product[]
): BulkInsertableProduct[] =>
  products.map(({ _id, categories, ...rest }) => ({
    _id: ObjectId(_id),
    categories: categories.map(({ _id: categoryId }) => ObjectId(categoryId)),
    ...rest,
  }))

  type BulkInsertableProductCategory = Omit<Product, '_id'> & { _id: ObjectId }
  export const formatProductCategoriesForBulkInsert = (
    products: Product[]
  ): BulkInsertableProduct[] =>
    products.map(({ _id, categories, ...rest }) => ({
      _id: ObjectId(_id),
      categories: categories.map(({ _id: categoryId }) => ObjectId(categoryId)),
      ...rest,
    }))

export const seedProducts = async (products: Product[]) => {
  await mongoose.connection.db
    .collection<BulkInsertableProduct>('Product')
    .insertMany(formatProductsForBulkInsert(products))
}

export const seedProductCategories = async (productCategories: ProductCategory[]) => {
  await mongoose.connection.db
    .collection<BulkInsertableProductCategory>('ProductCategory')
    .insertMany(formatProductCategoriesForBulkInsert(productCategories))
}

export const deleteAllProducts = async () => {
  await productModel.deleteMany({})
}
