import { Request } from 'express'

export const searchQuery = (req: Request) => [
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
      description: req.query?.search,
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

const isLimitValid = (query: any): any => {
  console.log(query <= 10000 && query != NaN)
}

export const buildQuery = (req: Request) => {
  const query = makeEmptyQuery()

  if (req.query?.search) {
    searchQuery(req).forEach((segment) => {
      query.body.query.bool.should.push(segment)
    })
  }

  if (typeof req.query?.offset && isLimitValid(req.query.offset)) {
    query.from = req.query.offset
  }

  if (req.query?.limit && isLimitValid(req.query.limit)) {
    query.size = req.query.limit
  }

  if (req.query?.category) {
    query.body.query.bool.must.push(categoryQuery(req))
  }

  return query
}
