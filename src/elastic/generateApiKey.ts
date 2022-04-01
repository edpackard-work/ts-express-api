import { client } from "./client"

export const generateApiKeys = async () => {
  const response = await client.security.createApiKey({
    body: {
      name: 'node',
      role_descriptors: {
        'node_writer': {
          'cluster': ['monitor'],
          'index': [
            {
              'names': ['products'],
              'privileges': ['write', 'read', 'manage']
            }
          ]
        }
      }
    }
  })

  return Buffer.from(`${response.id}:${response.api_key}`).toString('base64')
}
