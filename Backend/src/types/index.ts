import { Request } from "express";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: {
        id?: string;
        imgUrl: string;
    };
    isVerified: boolean;
}

export interface DataStoredInToken {
    id: string;
}

export interface RequestWithUserId extends Request {
    userId?: string;
}

export interface RequestWithUser extends Request {
    user: User;
}

export interface ErrorWithStatus extends Error {
    statusCode?: number;
    status?: string;
}