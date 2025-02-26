import express from 'express'
import referalRouter from './routes/refer.routes.js'

const app = express()
const PORT = process.env.PORT || 5003

app.use(express.json())

app.use('/api/refer', referalRouter)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})