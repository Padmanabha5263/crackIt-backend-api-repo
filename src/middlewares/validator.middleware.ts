import  { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


export const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array().map((e) => ({
            field: e.type === "field" ? e.path : undefined,
            message: e.msg
        })) });
    }
    next();
};