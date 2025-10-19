import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
export default mongoose.model("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map