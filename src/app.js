import express from "express";
import dotenv from "dotenv";
import initWebRoutes from "./routes/web.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

initWebRoutes(app);

// run-Server
const PORT = process.env.PORT || 5000;

// Kết nối MySQL
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error occurred with MongoDB connection. Error = ", err);
        process.exit(0);
    });
