import express, { json } from 'express'
import morgan from 'morgan'
import taskRouter from './routes/taskRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
app.use(morgan('dev'))
app.use(json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})