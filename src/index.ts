import { app } from './app'
import { dbConnect } from './dbConnect'
import { read } from './elastic'
// import { seedProducts } from './seedr'

read()

const PORT = process.env.PORT || 3000

;(async () => {
  await dbConnect()
  // if (process.env.SHOULD_SEED_ELASTIC === 'true') {
  //   Promise.all(seedProducts(1000)).then(console.log, console.log)
  // }
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
})()
