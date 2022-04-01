import { client } from './client';

export const seed = async () => {
  await client.index({
    index: 'products',
    body: {
      name: 'Margaritaville',
      description: 'A blender for making margaritas and destroying the economy',
      price: 100,
      stock: 90,
      category: 'white goods'
    }
  })

  await client.index({
    index: 'products',
    body: {
      name: 'Plumbus',
      description: 'An all-purpose home device',
      price: 24.99,
      stock: 273,
      category: 'white goods'
    }
  })

  await client.index({
    index: 'products',
    body: {
      name: 'Singing Stein',
      description: 'The stein is not sentient but does have a pleasant singing voice',
      price: 24.99,
      stock: 273,
      category: 'white goods'
    }
  })

  await client.indices.refresh({index: 'products'})
}

