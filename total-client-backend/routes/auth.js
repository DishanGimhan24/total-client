import express from "express";
import { userLogin } from "../controllers/auth.js";

const router = express.Router();

//User Sign In
router.post("/user/login", userLogin);

export default router;