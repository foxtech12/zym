// Install required dependencies
// npm install express mongoose dotenv bcryptjs jsonwebtoken cors cookie-parser

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB Connection
const connectDB = require("./db/dbConn");
connectDB()

const userRoute = require("./routes/userRoutes");
const contactRoute = require("./routes/contactRoute");

app.use("/api/auth", userRoute);
app.use("/api/contact", contactRoute);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
