const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const amadeusRoutes = require("./routes/amadeusRoutes")
const cors = require("cors")

require('dotenv').config()

const app = express()

// CORS

const allowedOrigins = ['http://localhost:3000']

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors()); // Enable CORS preflight for all routes


// middleware 

app.use(express.json())

// database 

connectDB()

// Routes

app.use('/api/auth', authRoutes)
app.use('/api/amadeus', amadeusRoutes)

// backend app listening 

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
    
})