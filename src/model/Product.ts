import { Schema, model } from 'mongoose'
import { ProductCategory } from './ProductCategory'

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
