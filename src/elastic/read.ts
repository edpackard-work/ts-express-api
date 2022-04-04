import { client } from './client'
import { Product } from '../model/Product'

export const read = async () => {
  const result = await client.search<Product>({
    index: 'products',
    body: {
      query: {
        fuzzy: {
          name: {
            value: 'cat',
          },
        },
      },
    },
  })
  console.log(
    result.hits.hits.map(
      (hit) =>
        `${hit._source?.name}, ${hit._source?.description.slice(0, 20)}...`
    )
  )
}
