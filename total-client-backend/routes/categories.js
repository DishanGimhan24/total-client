import express from 'express';
import {verifyToken} from './verifyToken.js';
import { createCategory, editCategory, deleteCategory, getCategories, getCategory, bulkDeleteCategories } from '../controllers/category.js';

const router = express.Router();

//add category
router.post("/new", verifyToken, createCategory);

//edit category
router.put("/edit/:id", verifyToken, editCategory);

//delete category
router.delete("/delete/:id", verifyToken, deleteCategory);

//get all categories
router.get("/all", verifyToken, getCategories);

//get a category
router.get("/find/:id", verifyToken, getCategory);

//bulk delete
router.delete("/bulkdelete",verifyToken, bulkDeleteCategories );

export default router;