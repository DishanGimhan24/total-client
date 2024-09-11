import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import vendorRoutes from "./routes/vendors.js";
import productRoutes from "./routes/products.js"
import authRoutes from "./routes/auth.js";
import brandRoutes from "./routes/brands.js";
import categoryRoutes from "./routes/categories.js";
import attributeRoutes from "./routes/attributes.js";
import customerRoutes from "./routes/customers.js";
import tagRoutes from "./routes/tags.js";
import taxRoutes from "./routes/tax.js"
import couponRoutes from "./routes/coupons.js";
import currencyRoutes from "./routes/currency.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB!")
    }).catch(err => {
        throw err;
    })
}


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/attribute", attributeRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/order",orderRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to Server!");
})