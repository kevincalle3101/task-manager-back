import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator'

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next()
    } catch (error) {
        res.status(400)
        res.send({ errors: error.array() })
    }
}