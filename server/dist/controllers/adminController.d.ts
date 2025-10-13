import type { Request, Response } from "express";
export declare const userRegistration: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const adminLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const approveUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllArticlesAdmin: (req: Request, res: Response) => Promise<void>;
export declare const getAllComments: (req: Request, res: Response) => Promise<void>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const getDashboard: (req: Request, res: Response) => Promise<void>;
export declare const deleteCommentById: (req: Request, res: Response) => Promise<void>;
export declare const approveCommentById: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=adminController.d.ts.map