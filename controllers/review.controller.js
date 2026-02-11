import Review from "../models/review.model.js";
import Book from "../models/book.model.js";

// Create Review
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { bookId, rating, comment } = req.body;

    const review = await Review.create({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    // Update totalReviews count in Book
    await Book.findByIdAndUpdate(bookId, {
      $inc: { totalReviews: 1 },
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Reviews for a Book
export const getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review)
      return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();

    await Book.findByIdAndUpdate(review.book, {
      $inc: { totalReviews: -1 },
    });

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
