import express from "express"
import { addBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/book.controller.js";
import { auth, isAdmin } from "../middleware/auth.js";



let router=express.Router();
router.post("/",auth ,isAdmin, addBook);

router.get("/",getBooks);
router.get("/:id",getBookById);

router.delete("/:id", auth,isAdmin, deleteBook);
router.put("/:id",auth ,isAdmin,updateBook);


export default router;