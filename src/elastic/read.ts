import { client } from "./client"

interface Product {
  name: String
  description: String
  price: Number
  stock: Number
  category: String
}

export const read = async () => {
  const result = await client.search<Product>({
    index: 'products',
    body: {
      query: {
        match: { description: 'blender' }
      }
    }
  })
  console.log(result.hits.hits)
}