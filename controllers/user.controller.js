import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
        expiresIn: "9d",
    });
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
        });

        return res.status(201).json({
            status: "success",
            message: "Signup successful",

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.password !== password)
            return res.status(400).json({ message: "Invalid password" });

        const token = generateToken(user._id, user.email, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({

            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                phone: user.phone,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, phone, role, isActive } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, phone, role, isActive },
            { new: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        return res
            .status(200)
            .json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const searchUsersByName = async (req, res) => {
    try {
        const { search } = req.query;
        console.log(search)
        const users = await User.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
            ],
        }).select("-password");

        if (!users.length)
            return res.status(404).json({ message: "No users found" });

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
