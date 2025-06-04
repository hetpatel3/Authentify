import express from 'express'
import connectDB from './src/database/auth.database.js'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.route.js'
import googleAuthRoutes from './src/routes/googleAuth.route.js'
import userRoute from './src/routes/user.route.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import session from 'express-session';
import passport from 'passport';
import './src/config/passport.js'

dotenv.config({
    path: './.env'
});

connectDB();

const app = express();

app.use(session({     //session is used to store the data of the user
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'SECRET'
  }));

app.use(express.json())                                   
app.use(express.urlencoded({ extended: true })) //urlencoded is used to parse the data coming from the form 
app.use(cookieParser()) //cookie parser is used to parse the cookies
app.use(passport.initialize()); // initialize method is used to initialize the passport
app.use(passport.session()); //passport.session is used to store the data of the user in the session

// Serve static frontend files
app.use(express.static('frontend')); //exprees.static is used to serve the static files like images, css, js files

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
app.use("/api/auth", googleAuthRoutes)
app.use("/api", userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});

