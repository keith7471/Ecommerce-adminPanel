import pg from 'pg'
import env from "dotenv"

env.config()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST ,
    database: process.env.PG_DATABASE ,
    password: process.env.PG_PASSWORD,  
    port: process.env.PG_PORT,

})

db.connect().then(() => console.log('Connected to PostgresSQL')).catch((err) => console.log('Database connection error',err));

// database on error
// db.on('error', (err) =>{
//     console.error('unexpected error on client', err);
//     process.exit(-1);
// });

export const query =(text,params) => db.query(text, params);   // executing the sql query

// text → A string representing the SQL query.
// params → An array of values that will be safely inserted into the query (to prevent SQL injection).