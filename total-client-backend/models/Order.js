import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    shippingId: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    billingAddress: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    coupon: {
        type: String
    },
    payementId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
}, {timestamps: true}
);

export default mongoose.model('Order', OrderSchema);




