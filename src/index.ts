import { app } from './app'
import { dbConnect } from './dbConnect'
import { read } from './elastic'
import { seedProducts } from './seedr'

const PORT = process.env.PORT || 3000

;(async () => {
  await dbConnect()
  if (process.env.SHOULD_SEED === 'true') {
    await seedProducts(1000)
  }
  await read()
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
})()
