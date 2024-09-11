import express from "express";
import { createProduct } from "../controllers/product.js";
import {verifyToken} from "./verifyToken.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage: storage});

const router = express.Router();

const imageFiles = upload.fields([{name: "img", maxCount: 1}, {name: "gallery", maxCount: 8}]);

//create product with single image field and multiple image gallery
router.post("/new", verifyToken, imageFiles, createProduct);

export default router;