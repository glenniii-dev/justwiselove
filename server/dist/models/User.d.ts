import { Document, Model } from "mongoose";
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isApproved: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map