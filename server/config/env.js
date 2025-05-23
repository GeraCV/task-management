import dotenv from 'dotenv'
import { join } from 'path'
import  appRoot from 'app-root-path'

const rootEnv = join(appRoot.path, '/.env')

dotenv.config({path: rootEnv})

const envConfig = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
    db_database: process.env.DB_DATABASE,
    client_url: process.env.CLIENT_URL
}

export default envConfig