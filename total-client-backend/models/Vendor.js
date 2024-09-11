import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        default: null,
        required: true,
    },
    address: {
        type: String,
        default: null,
        required: true,
    },
}, { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);