import express from "express";
import * as articleController from "../controllers/articleController.js";
import auth from "../middleware/auth.js";
const articleRouter = express.Router();
articleRouter.post("/add", auth, articleController.addArticle);
articleRouter.get("/all", articleController.getAllArticles);
articleRouter.get("/:articleId", articleController.getArticleById);
articleRouter.delete("/delete", auth, articleController.deleteArticleById);
articleRouter.post("/toggle-publish", auth, articleController.togglePublish);
articleRouter.post("/add-comment", articleController.addComment);
articleRouter.post("/comments", articleController.getArticleComments);
export default articleRouter;
//# sourceMappingURL=articleRoutes.js.map