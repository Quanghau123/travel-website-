import express from "express";
import dotenv from "dotenv";
const cors = require('cors');
import initWebRoutes from "./routes/web.js";
import connectDB from "./config/connectDB.js";
import checkAllowedOrigin from "./middleware/checkAllowedOrigin.js";
import checkBearerAuth from "./middleware/checkBearerAuth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//on CORS
app.use(cors());

//app.use(checkAllowedOrigin);
//app.use(checkBearerAuth);

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
