import express from "express";
import * as adminController from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// ✅ Public routes
adminRouter.post("/register", adminController.userRegistration);
adminRouter.post("/login", adminController.adminLogin);

// ✅ Protected routes (require JWT)
adminRouter.post("/approve", auth, adminController.approveUser);
adminRouter.delete("/delete", auth, adminController.deleteUser);
adminRouter.get("/articles", auth, adminController.getAllArticlesAdmin);
adminRouter.get("/comments", auth, adminController.getAllComments);
adminRouter.get("/users", auth, adminController.getAllUsers);
adminRouter.get("/dashboard", auth, adminController.getDashboard);

// ✅ Comment actions
adminRouter.delete("/comments/delete", auth, adminController.deleteCommentById);
adminRouter.put("/comments/approve", auth, adminController.approveCommentById);

export default adminRouter;