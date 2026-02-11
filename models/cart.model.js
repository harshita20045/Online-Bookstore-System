import mongoose from "mongoose";

let cartItemSchema = new mongoose.Schema(
    {

        userId: {
            type: String,
            required: true
        },
        items: [{
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            unitPrice: {
                type: Number,
                required: true,
                min: 0,
            },
        }
        ],

    }

);

const Cart = mongoose.model("cart", cartItemSchema);

export default Cart;

