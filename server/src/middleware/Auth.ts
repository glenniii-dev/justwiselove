import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';


const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      jwt.verify(token, process.env.JWT_SECRET)
      next();
    }
  } catch (error) {
    res.json({sucess: false, message: 'Invalid token'})
  }
};

export default auth;