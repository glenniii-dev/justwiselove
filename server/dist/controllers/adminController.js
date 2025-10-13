import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Article from "../models/Article.js";
import Comment from "../models/Comment.js";
export const userRegistration = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }
        const user = await User.create({ email, password });
        res.json({
            success: true,
            message: "Registration successful. Awaiting admin approval."
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Unknown error" });
        }
    }
};
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        if (!user.isApproved) {
            return res.json({ success: false, message: "Account not approved yet" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Unknown error" });
        }
    }
};
export const approveUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndUpdate(userId, { isApproved: true, role: "admin" }, { new: true });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: `${user.email} is now an admin.` });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Unknown error" });
        }
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: `${user.name} has been deleted.` });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "An unknown error occurred" });
        }
    }
};
export const getAllArticlesAdmin = async (req, res) => {
    try {
        const articles = await Article.find({}).sort({ createdAt: -1 });
        res.json({ success: true, articles });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({})
            .populate("articlr")
            .sort({ createdAt: -1 });
        res.json({ success: true, comments });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
export const getDashboard = async (req, res) => {
    try {
        const totalArticles = await Article.countDocuments({});
        const totalComments = await Comment.countDocuments({});
        const totalDrafts = await Article.countDocuments({ isPublished: false });
        const recentArticles = await Article.find({})
            .sort({ createdAt: -1 })
            .limit(5);
        const dashboardData = {
            totalArticles,
            totalComments,
            totalDrafts,
            recentArticles,
        };
        res.json({ success: true, dashboardData });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            console.log("An unknown error occurred");
        }
    }
};
//# sourceMappingURL=adminController.js.map