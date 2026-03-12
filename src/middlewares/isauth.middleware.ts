// middle ware to check all the request is authenticated or not
import type{ Request, Response, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }
  next();
  } 
  catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown middleware error' });
  }
};