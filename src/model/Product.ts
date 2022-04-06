import { Schema, model } from 'mongoose'
import { ProductCategory, productCategoryModel } from './ProductCategory'
console.log(
  '🚀 ~ file: Product.ts ~ line 3 ~ productCategoryModel',
  productCategoryModel
)

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  categories: ProductCategory[]
}

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'ProductCategory',
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const productModel = model<Product>('Product', productSchema)
