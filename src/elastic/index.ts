import config from 'config'
import { ElasticConfig } from './client'
import { generateApiKeys } from './generateApiKey'

export * from './client'
export * from './generateApiKey'

if (
  process.env.NODE_ENV === 'development' &&
  !config.get<ElasticConfig>('elastic').apiKey
) {
  console.log('Generating API key')
  generateApiKeys().then((res) => {
    console.log(res)
  })
}
