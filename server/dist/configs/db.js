import mongoose from "mongoose";
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("❌ MONGODB_URL is not defined in .env");
        }
        // Use dbName option for clarity and flexibility
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "justwiselove",
        });
        mongoose.connection.on("connected", () => {
            console.log("✅ MongoDB connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB connection failed:", error.message);
        }
        else {
            console.error("❌ Unknown MongoDB error occurred");
        }
        process.exit(1); // stop app if DB can’t connect
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map