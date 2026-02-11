import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";
import { auth, isAdmin, isUser } from "../middleware/auth.js";



const router = express.Router();

router.post("/", auth,isUser, createOrder);

router.get("/:userId", auth,isAdmin, getUserOrders);

router.put("/:orderId/status", auth, isAdmin , updateOrderStatus);

export default router;
