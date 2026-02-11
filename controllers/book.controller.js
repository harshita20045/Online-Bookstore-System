import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
    try {
        let book = req.body;

        await Book.create(book);
        return res.status(200).json({
            status: "success",
            message: "Book added successfully"

        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Book not added"
        })
    }
}

export const getBooks = async (req, res) => {
    try {
        let books = await Book.find();
        return res.status(200).json({
            status: "success",
            data: books
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Books not found"
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        let book = await Book.findById(id);
        console.log(book);
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: book
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Book not found"
        })
    }
}

export const updateBook = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let book = await Book.findByIdAndUpdate(id, data, { new: true })
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: book
        })

    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Book not updated"
        })
    }
}


export const deleteBook = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        let book = await Book.findByIdAndDelete(id)
        console.log(book)
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Book not deleted"
        })
    }
}

