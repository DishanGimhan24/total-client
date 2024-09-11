import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sku: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
    specifications: {
        type: Array,
        default: [],
    },
    img: {
        type: String,
        default: null,
    },
    gallery: {
        type: Array,
        default: [],
    },
    stockStatus: {
        type: String,
        default: "in stock",
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    productType: {
        type: String,
        default: "simple",
        required: true,
    },
    parentId: {
        type: String,
        default: null,
    },
    categories: {
        type: Array,
        default: [],
        required: true,
    },
    attributes: {
        type: Array,
        default: [],
    },
    brand: {
        type: String,
        default: null,
    },
    tags: {
        type: Array,
        default: [],
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    salePrice: {
        type: Number,
        default: 0,
    },
    vendors: {
        type: Array,
        default: [],
    },
    taxId: {
        type: String,
        default: null,
    },
    dimensions: {
        type: Array,
        default: [],
    },
    weight: {
        type: Number,
        default: null,
    },
    warranty: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: "published",
        required: true,
    },
}, { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);