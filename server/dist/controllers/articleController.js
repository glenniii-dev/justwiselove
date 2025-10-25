import Article from "../models/Article.js";
import Comment from "../models/Comment.js";
export const addArticle = async (req, res) => {
    try {
        const { title, subtitle, content, category, isPublished } = JSON.parse(req.body.article);
        // Check required fields: title, content, category must be present.
        // isPublished is a boolean and can be false, so explicitly check for undefined.
        if (!title || !content || !category || typeof isPublished === 'undefined') {
            return res.json({ success: false, message: "Missing required fields" });
        }
        await Article.create({ title, subtitle, content, category, isPublished });
        res.json({ success: true, message: "Article added successfully" });
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
export const getAllArticles = async (req, res) => {
    try {
        const articles = (await Article.find({ isPublished: true })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
export const getArticleById = async (req, res) => {
    try {
        const { articleId } = req.params;
        const article = await Article.findById(articleId);
        if (!article) {
            return res.json({ success: false, message: "Article not found" });
        }
        res.json({ success: true, article });
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
export const deleteArticleById = async (req, res) => {
    try {
        const { id } = req.body;
        await Article.findByIdAndDelete(id);
        // Delete all comments associated with the article
        await Comment.deleteMany({ article: id });
        res.json({ success: true, message: "Article deleted successfully" });
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
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const article = await Article.findById(id);
        if (!article) {
            return res.json({ success: false, message: "Article not found" });
        }
        article.isPublished = !article.isPublished;
        await article.save();
        res.json({ success: true, message: "Article status updated" });
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
export const addComment = async (req, res) => {
    try {
        const { article, name, content } = req.body;
        await Comment.create({ article, name, content });
        res.json({ success: true, message: "Comment added for review" });
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
export const getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.body;
        const comments = (await Comment.find({ article: articleId, isApproved: true })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
//# sourceMappingURL=articleController.js.map