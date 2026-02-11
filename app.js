import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import bookRouter from "./routes/book.route.js"
import cookieParser from "cookie-parser";
import { specs, swaggerUi } from "./swagger.js";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Database Connected")).catch(() => console.log("Database Not Connected"));


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/books", bookRouter);
app.listen(process.env.PORT, () => {
    console.log('server started working')
})