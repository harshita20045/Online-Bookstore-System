import express from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart.controller.js";
import { auth, isUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, isUser, addToCart);

router.get("/:userId",auth ,isUser, getCart);

router.put("/",auth ,isUser, updateCartItem);

router.delete("/", removeCartItem);

export default router;
