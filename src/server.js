import express from 'express'
import cors from 'cors'
import referalRouter from './routes/refer.routes.js'

const app = express()
const PORT = process.env.PORT || 5003

app.use(cors({
    origin: "https://accredian-frontend-task-three-ruby.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}))

app.use(express.json())

app.use('/api/refer', referalRouter)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})