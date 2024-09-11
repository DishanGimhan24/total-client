import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: null,
    },
    img: {
        type: String,
        default: null,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    dob: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        default: null,
    },
    hourlyRate: {
        type: Number,
        default: 0,
    },
    otRate: {
        type: Number,
        default: 0,
    },
    regularHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
);

export default mongoose.model("User", UserSchema);