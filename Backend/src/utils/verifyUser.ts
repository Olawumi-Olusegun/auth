import {  Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import sanitizedConfig from "../config";
import { DataStoredInToken, RequestWithUserId } from "../types";
import { isValidObjectId } from "mongoose";
import UserModel from "../models/user.model";


export const verifyToken = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  
    try {

        const token = req.cookies?.accessToken || null;
    
        if(!token) {
            return res.status(401).json({ success: false, message: "You are not authenticated"});
        }
    
        const decodedJWT = jwt.verify(token, sanitizedConfig.JWT_SECRET) as DataStoredInToken;

        if(!isValidObjectId(decodedJWT.id)) {
            return res.status(400).json({ success: false, message: "Invalid user"});
        }

        const userExist = await UserModel.findById(decodedJWT.id);

        if(!userExist) {
            return res.status(400).json({ success: false, message: "Invalid user"});
        }

        req.userId = userExist.id;
    
        next();
        
    } catch (error) {
       next(error);
    }
} 