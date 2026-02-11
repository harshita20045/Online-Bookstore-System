import express from "express"
import { deleteUser, getAllUsers, getUserByEmail, getUserById, login, logout, searchUsersByName, register, updateUser } from "../controllers/user.controller.js";
import { auth, isAdmin, isUser } from "../middleware/auth.js";



let router=express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/search", auth , isUser, searchUsersByName);
router.get("/email/:email", auth,isUser,getUserByEmail);
router.get("/",auth,isUser, getAllUsers);
router.get("/:userId",auth,isUser, getUserById);
router.put("/:userId",auth ,isUser, updateUser);
router.delete("/:userId", deleteUser);


export default router;