import express from 'express'
import connectDB from './src/database/auth.database.js'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.route.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({
    path: './.env'
});

connectDB();

const app = express();

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cookieParser());

const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500','http://127.0.0.1:5501', 'http://localhost:5501'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});

