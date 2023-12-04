import { ErrorWithStatus } from "../types";
import crypto from 'crypto'


export const errorHandler = (statusCode: number, message: string) => {
    const error = new Error() as ErrorWithStatus;
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export const generateRandomBytes = () => {
    return  crypto.randomBytes(36).toString("hex");
}