import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    values: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "published",
        required: true,
    },
}, {timestamps: true}
);

export default mongoose.model("Attribute", AttributeSchema);