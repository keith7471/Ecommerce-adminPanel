import express from 'express'
import cors from 'cors'
import clientRoutes from './routes/clientRoute.js'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// passing a middle ware functions
app.use(cors({
    origin: ["http://localhost:5173","postgresql://adminpanel_db_user:R7boxGn3UegVuNcvUdgD9hP4wAXvTWcO@dpg-cvbg50rqf0us73d8m4t0-a.oregon-postgres.render.com/adminpanel_db"],
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
