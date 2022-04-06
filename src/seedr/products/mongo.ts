import mongoose from 'mongoose'
import ObjectId from 'bson-objectid'
import { Product, productModel } from '../../model/Product'
import {
  ProductCategory,
  productCategoryModel,
} from '../../model/ProductCategory'

type BulkInsertableProduct = Omit<Product, '_id' | 'categories'> & {
  _id: ObjectId
  categories: ObjectId[]
}
export const formatProductsForBulkInsert = (
  products: Product[]
): BulkInsertableProduct[] =>
  products.map(({ _id, categories, ...rest }) => ({
    _id: ObjectId(_id),
    categories: categories.map(({ _id: categoryId }) => ObjectId(categoryId)),
    ...rest,
  }))

type BulkInsertableProductCategory = Omit<ProductCategory, '_id'> & {
  _id: ObjectId
}
export const formatProductCategoriesForBulkInsert = (
  productCategories: ProductCategory[]
): BulkInsertableProductCategory[] =>
  productCategories.map(({ _id, ...rest }) => ({
    _id: ObjectId(_id),
    ...rest,
  }))

export const seedProducts = async (products: Product[]) => {
  await mongoose.connection.db
    .collection<BulkInsertableProduct>('products')
    .insertMany(formatProductsForBulkInsert(products))
}

export const seedProductCategories = async (
  productCategories: ProductCategory[]
) => {
  await mongoose.connection.db
    .collection<BulkInsertableProductCategory>('productcategories')
    .insertMany(formatProductCategoriesForBulkInsert(productCategories))
}

export const deleteAllProducts = async () => {
  await productModel.deleteMany({})
}

export const deleteAllProductCategories = async () => {
  await productCategoryModel.deleteMany({})
}
