import express from 'express';
import {createTax, editTax, deleteTax, getAllTaxes, getTax,bulkDeletetaxes} from '../controllers/tax.js';
import {verifyToken} from "./verifyToken.js";

const router = express.Router();

//create tax
router.post("/new", verifyToken, createTax);

//edit tax
router.put("/edit/:id", verifyToken, editTax);

//delete tax
router.delete("/delete/:id", verifyToken, deleteTax);

//get all taxes
router.get("/all", verifyToken, getAllTaxes);

//get tax by id
router.get("/find/:id", verifyToken, getTax);

router.delete("/bulkdelete",verifyToken, bulkDeletetaxes );

export default router;