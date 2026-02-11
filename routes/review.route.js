import express from "express";
import {
    createReview,
    getBookReviews,
    deleteReview,
} from "../controllers/review.controller.js";


const router = express.Router();

router.post("/", createReview);


router.get("/:bookId", getBookReviews);


router.delete("/:reviewId", deleteReview);

export default router;
