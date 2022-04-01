import { Client } from '@elastic/elasticsearch'
import config from 'config'

export interface ElasticConfig {
  cloudID: string
  username: string
  password: string
  apiKey: string
}

const { cloudID, username, password, apiKey } =
  config.get<ElasticConfig>('elastic')

const devAuth = {
  username: username,
  password: password,
}

const prodAuth = {
  apiKey,
}

const auth = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Using development elastic auth credentials')
    return devAuth
  }
  return prodAuth
})()

export const client = new Client({
  cloud: {
    id: cloudID,
  },
  auth,
})
