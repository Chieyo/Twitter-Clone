//Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
//Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
//Utils
import connectMongoDB from "./database/connectMongoDB.js";


dotenv.config(); //Displays .env file value in the terminal

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({limit: "5mb"})); //Parse req.body in the auth.controller.Limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({extended: true})); //Parse form data(urlencoded) in Postman

app.use(cookieParser()); //Parse request to get cookies

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
