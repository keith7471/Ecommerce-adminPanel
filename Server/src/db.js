import pg from 'pg'
import env from "dotenv"

env.config()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST || 'localhost', 
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    // port: process.env.PG_PORT || 5433, 
    port: process.env.PG_PORT || 5432, 
    ssl: { rejectUnauthorized: false }
});

db.connect().then(() => console.log('Connected to PostgresSQL')).catch((err) => console.log('Database connection error',err));
export const query =(text,params) => db.query(text, params);   // executing the sql query

// text → A string representing the SQL query.
// params → An array of values that will be safely inserted into the query (to prevent SQL injection).
