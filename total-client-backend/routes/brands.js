import {verifyToken} from "./verifyToken.js";
import express from "express";
import { createBrand, editBrand, deleteBrand, getAllBrands, getBrand, bulkDeleteBrands} from "../controllers/brand.js";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "uploads/brands";
  
      // Check if the directory exists, if not, create it
      fs.access(uploadPath, (error) => {
        if (error) {
          fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
              console.error("Error creating directory:", err);
              cb(err, null);
            } else {
              cb(null, uploadPath);
            }
          });
        } else {
          cb(null, uploadPath);
        }
      });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

const upload = multer({storage: storage});

const router = express.Router();

//create brand
router.post("/new", upload.single('img'), verifyToken, createBrand);

//edit brand
router.put("/update/:id", upload.single('img'), verifyToken, editBrand);

//delete brand
router.delete("/delete/:id", verifyToken, deleteBrand);

//get all brands
router.get("/all", verifyToken, getAllBrands);

//get a brand
router.get("/find/:id", verifyToken, getBrand);

//delete all brand
router.delete("/bulkdelete",verifyToken, bulkDeleteBrands );


export default router;