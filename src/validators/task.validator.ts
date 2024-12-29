import { check } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import { validateResult } from '../helpers/validateHelper';

export const validateCreate = [
    check('title')
        .exists()
        .withMessage('El título es requerido')
        .not()
        .isEmpty()
        .withMessage('El título no puede estar vacío'),
        ( req: Request, res: Response, next: NextFunction ) => {
            validateResult( req, res, next )
        }
]

export const validateId = [
    check('id')
        .exists()
        .withMessage('El ID es requerido')
        .not()
        .isEmpty()
        .withMessage('El ID no puede estar vacío')
        .isMongoId()
        .withMessage('El ID no está en formato MongoDB ID'),
        ( req: Request, res: Response, next: NextFunction ) => {
            validateResult( req, res, next )
        }
]