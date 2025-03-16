import express from 'express'
import cors from 'cors'
import clientRoutes from './routes/clientRoute.js'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// passing a middle ware functions
app.use(cors({
    origin: ["http://localhost:5173","https://ecommerce-adminpanel-backend-lnwv.onrender.com"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

// ✅ Increase request body size limit
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use('/api',clientRoutes)

app.listen(port, () =>{
    console.log(`listening on port: ${port}`)
} )
