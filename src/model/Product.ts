import { Schema, model } from 'mongoose'

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
}

const productSchema = new Schema<Product>({
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
  category: {
    type: String,
    require: true,
  },
})

export const productModel = model<Product>('Product', productSchema)
