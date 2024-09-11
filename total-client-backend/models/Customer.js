import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    }
}, {timestamps: true});

export default mongoose.model('Customer', customerSchema);