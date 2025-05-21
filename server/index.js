import express, { json } from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))
app.use(json())

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})