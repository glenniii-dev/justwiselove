import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
// 🧩 Middleware
app.use(cors());
app.use(express.json());
// 🏠 Base route
app.get("/", (req, res) => {
    res.send("API is running...");
});
// 🔐 Admin routes
app.use("/api/admin", adminRouter);
// 📰 Article routes
app.use("/api/articles", articleRouter);
// 🚀 Start server after DB connection
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
};
startServer();
export default app;
//# sourceMappingURL=server.js.map