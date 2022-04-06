import { Schema, model } from 'mongoose'

export interface ProductCategory {
  _id: string
  name: string
  description: string
}

const productCategorySchema = new Schema<ProductCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const productCategoryModel = model<ProductCategory>(
  'ProductCategory',
  productCategorySchema
)
