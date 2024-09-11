import mongoose from 'mongoose';

const CurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    symbol: {
        type: String,
        default: null
    },
    rate: {
        type: Number
    }
}, {timestamps: true}
);

export default mongoose.model('Currency', CurrencySchema);