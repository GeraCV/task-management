import express, { json } from 'express'
import morgan from 'morgan'
import taskRouter from './routes/taskRoute.js'

const app = express()
app.use(morgan('dev'))
app.use(json())
app.use('/tasks', taskRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})