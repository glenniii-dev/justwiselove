import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Article from "../models/Article.js";
import Comment from "../models/Comment.js";
import type { Request, Response, NextFunction } from 'express';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the admin in the database
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // optional expiration time
    );

    res.json({ success: true, token });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const getAllArticlesAdmin = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({})
      .populate("articlr")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const getDashboard = async (req: Request, res: Response) => {
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
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const approveCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved" });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      console.log('An unknown error occurred');
    }
  }
};
