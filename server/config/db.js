import mysql from 'mysql2/promise'
import envConfig from './env.js'

const configDB = {
    host: envConfig.db_host,
    user: envConfig.db_user,
    database: envConfig.db_database,
    password: envConfig.db_password,
    port: envConfig.db_port
}

let connection

try {
    connection = await mysql.createConnection(configDB)
    console.log('The connection has been successfully established.')
} catch (error) {
    throw new Error('Unable to connect to the database:' + error)
}

class Database {
    static async query (query, params = []) {
        try {
            const [results, fields] = await connection.query(
                query,
                params
            )
            return results
        } catch (error) {
            throw new Error('Error during execution' + error)
        }
    }
}

export default Database