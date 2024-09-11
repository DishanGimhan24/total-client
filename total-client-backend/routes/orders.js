import express from "express";
import { verifyToken } from "./verifyToken.js";
import { newOrder, editOrder, deleteOrder, getOrder, getOrders, bulkDeleteOrders } from "../controllers/order.js";

const router = express.Router();

// Create a new order
router.post("/new", verifyToken, newOrder);

// Edit a order
router.put("/edit/:id", verifyToken, editOrder);

// Delete a order
router.delete("/delete/:id", verifyToken, deleteOrder);

// Get a order
router.get("/find/:id", verifyToken, getOrder);

// Get all orders
router.get("/all", verifyToken, getOrders);
//bilk delete
router.delete("/bulkdelete", verifyToken, bulkDeleteOrders);

export default router;