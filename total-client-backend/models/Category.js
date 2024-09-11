import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: null,
    },
    parentId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: "published",
        required: true,
    },
}, {timestamps: true}
);

export default mongoose.model("Category", categorySchema);