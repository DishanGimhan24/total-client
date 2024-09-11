import express from "express";
import { verifyToken } from "./verifyToken.js";
import { newCoupon, editCoupon, deleteCoupon, getCoupon, getCoupons,bulkDeleteCoupons } from "../controllers/coupon.js";

const router = express.Router();

// Create a new coupon
router.post("/new", verifyToken, newCoupon);

// Edit a coupon
router.put("/edit/:id", verifyToken, editCoupon);

// Delete a coupon
router.delete("/delete/:id", verifyToken, deleteCoupon);

// Get a coupon
router.get("/find/:id", verifyToken, getCoupon);

// Get all coupons
router.get("/all", verifyToken, getCoupons);

router.delete("/bulkdelete",verifyToken, bulkDeleteCoupons);

export default router;