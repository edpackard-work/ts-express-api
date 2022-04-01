import { app } from '../app'

import request from 'supertest'

describe('Integration test for /demo GET route', () => {
  it('returns correct status code and message', async () => {
    const result = await request(app).get('/demo')
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual('Demo GET route is working')
  })
})
