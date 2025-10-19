import type { Request, Response } from "express";
export declare const addArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllArticles: (req: Request, res: Response) => Promise<void>;
export declare const getArticleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteArticleById: (req: Request, res: Response) => Promise<void>;
export declare const togglePublish: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addComment: (req: Request, res: Response) => Promise<void>;
export declare const getArticleComments: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=articleController.d.ts.map