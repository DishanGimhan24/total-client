import express from "express";
import { update, deleteVendor, getVendor, addVendor, getAllVendors, bulkDeleteVendors } from "../controllers/vendor.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router();

//update vendor
router.put("/update/:id/", verifyToken, update)

//delete vendor
router.delete("/delete/:id", verifyToken, deleteVendor)

//get a vendor
router.get("/find/:id", verifyToken, getVendor)

//create vendor
router.post("/new",verifyToken,addVendor)

//get all vendors
router.get("/all",verifyToken, getAllVendors)

router.delete("/bulkdelete",verifyToken, bulkDeleteVendors );

export default router;