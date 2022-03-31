import app from './app'
import { seed, read } from './elastic'

if (process.env.SHOULD_SEED_ELASTIC === 'true') {
  seed()
}

read()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
