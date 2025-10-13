import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    subtitle?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Article.d.ts.map