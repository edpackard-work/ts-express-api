import { Request } from 'express'
import { inspect } from 'util'

export const searchQuery = (req: Request) => [
  {
    fuzzy: {
      description: req.query?.search,
    },
  },
  {
    fuzzy: {
      name: {
        value: req.query?.search,
        boost: 5,
      },
    },
  },
  {
    fuzzy: {
      'category.name': req.query?.search,
    },
  },
]

export const categoryQuery = (req: Request) => ({
  bool: {
    should: [req.query?.category]
      .flat()
      .map((category) => ({ match: { 'categories.name': category } })),
  },
})

const makeEmptyQuery = (): any => ({
  index: 'products',
  body: {
    query: {
      bool: {
        filter: [],
        must: [],
        must_not: [],
        should: [],
      },
    },
  },
})

export const isQueryParamValidNumber = (query: unknown): Boolean => {
  let result = query as Number
  return result <= 10000 && result >= 0 && Number.isSafeInteger(result)
}

export const buildQuery = (req: Request) => {
  const query = makeEmptyQuery()

  if (req.query?.search) {
    searchQuery(req).forEach((segment) => {
      query.body.query.bool.should.push(segment)
    })
  }

  if (typeof req.query?.offset && isQueryParamValidNumber(req.query.offset)) {
    query.from = req.query.offset
  }

  if (req.query?.limit && isQueryParamValidNumber(req.query.limit)) {
    query.size = req.query.limit
  }

  if (req.query?.category) {
    query.body.query.bool.must.push(categoryQuery(req))
    console.log(inspect(req.query, false, null, true))
    console.log(inspect(categoryQuery(req), false, null, true))
  }

  return query
}
