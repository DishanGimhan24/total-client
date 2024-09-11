import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: true,
        required: true,
    },
}, {timestamps: true}
);

export default mongoose.model('Brand', BrandSchema);