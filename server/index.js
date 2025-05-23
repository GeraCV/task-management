import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import taskRouter from './routes/taskRoute.js'
import userRouter from './routes/userRoute.js'
import envConfig from './config/env.js'


const app = express()
app.use(morgan('dev'))
app.use(json())

const clientUrl = envConfig.client_url

const corsOptions = {
    origin : [`${clientUrl}`],
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders : ["Content-type", 'Authorization'],
    optionSuccessStatus : 200,
    credentials : true
}

app.use(cors(corsOptions))
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})