import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: "active"
    }
}, { timestamps: true }
);

export default mongoose.model('Coupon', CouponSchema);