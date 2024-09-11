import express from "express";
import { verifyToken } from "./verifyToken.js";
import { newCurrency, editCurrency, deleteCurrency, getCurrency, getCurrencies, bulkDeleteCurrency } from "../controllers/currency.js";

const router = express.Router();

// Create a new currency
router.post("/new", verifyToken, newCurrency);

// Edit a currency
router.put("/edit/:id", verifyToken, editCurrency);

// Delete a currency
router.delete("/delete/:id", verifyToken, deleteCurrency);

// Get a currency
router.get("/find/:id", verifyToken, getCurrency);

// Get all currencies
router.get("/all", verifyToken, getCurrencies);

router.delete("/bulkdelete",verifyToken, bulkDeleteCurrency );

export default router;