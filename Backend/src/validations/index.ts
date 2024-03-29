import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { errorHandler } from "../utils/errorHandler";


export const validateSchema = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    } catch (error) {
        return next(errorHandler(400, (error as any)?.message));
    }
}