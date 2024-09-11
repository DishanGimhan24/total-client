import express from "express";
import { update, deleteUser, getUser, addUser, getAllUsers, changePassword } from "../controllers/user.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router();

//update user
router.put("/update/:id", verifyToken, update)

//delete user
router.delete("/:id", verifyToken, deleteUser)

//get a user
router.get("/find/:id", getUser)

//create user
router.post("/new", addUser)

//get all users
router.get("/all", getAllUsers)

//change password
router.put("/password-reset/:id", verifyToken, changePassword)

export default router;