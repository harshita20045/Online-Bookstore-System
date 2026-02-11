import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        publisher: String,

        language: {
            type: String,
            default: 'English',
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },

        totalReviews: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);




const Book = mongoose.model('Book', bookSchema);

export default Book;