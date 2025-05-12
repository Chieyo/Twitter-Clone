import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./database/connectMongoDB.js";


dotenv.config(); //Displays .env file value in the terminal

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); //Parse req.body in the auth.controller
app.use(express.urlencoded({extended: true})); //Parse form data(urlencoded) in Postman

app.use(cookieParser()); //Parse request to get cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
