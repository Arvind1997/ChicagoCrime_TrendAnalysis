import mysql from 'mysql2/promise'
import nextConfig from '../next.config'

export async function query({ query, values = [] }) {

const db = await mysql.createConnection({

        host: process.env.MYSQL_HOST,
        post: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        
    })

    try {
        const [results] = await db.execute(query, values);
        db.end();
        return results;
    } catch (error) {
        throw Error(error.message);
        return { error };
    }

}