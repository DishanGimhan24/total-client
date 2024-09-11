import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "published",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Tax", taxSchema);