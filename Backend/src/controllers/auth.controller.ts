import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { httpStatusCode } from '../utils/httpStatusCodes';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  
    const { username, email, password } = req.body;

    try {

        const userExist = await UserModel.findOne({ email });

        if(userExist) {
            return res.status(httpStatusCode.BAD_REQUEST).json({success: false,  message: `user with ${email} already exist`});
        }

        const newUser = new UserModel({username, email, password});

        const user = await newUser.save();

        const data = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            isVerified: user.isVerified,
        }
      
        return res.status(httpStatusCode.CREATED).json({ success: true, message: "User created successfully", data});

    } catch (error) {
        next(error);
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  
    const { email, password } = req.body;

    try {

        const userExist = await UserModel.findOne({ email });

        if(!userExist) {
            return res.status(401).json({success: false,  message: `user does not exist`});
        }

        if(userExist?.loginProvider == "google") {
            return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials"});
        }

        const isvalidPassword  = await userExist.isvalidPassword(password);

        if(!isvalidPassword) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({success: false, message: "Invalid login"});
        }

        const expiryDate = new Date(Date.now() + 3600000);

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET || "", { expiresIn: "1d"});
        
        const data = {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            avatar: userExist.avatar,
            isVerified: userExist.isVerified,
        }

        return res.cookie("accessToken",
          token,
        { httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ success: true, message: "User signup successfully ", data });

    } catch (error) {
        next(error);
    }
}

export const google = async (req: Request, res: Response, next: NextFunction) => {

    let { username, email, avatar } = req.body;

    username = username.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 1000).toString();

    try {

        if(!email || !username) {
            return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials"});
        }

        const userExist = await UserModel.findOne({ email });

        if(!userExist) {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const createUser = new UserModel({ username, email, avatar, password: generatedPassword, loginProvider: "google" })
            const newUser = await createUser.save();

            const expiryDate = new Date(Date.now() + 3600000);

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "", { expiresIn: "1d"});
            
            const data = {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
                isVerified: newUser.isVerified,
            }
    
            return res.cookie("accessToken",
              token,
            { httpOnly: true,
              expires: expiryDate,
            })
            .status(200)
            .json({ success: true, message: "User signup successfully ", data });
        }

        if(userExist?.loginProvider == "credentials") {
            return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials"});
        }

        const expiryDate = new Date(Date.now() + 3600000);

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET || "", { expiresIn: "1d"});
        
        const data = {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            avatar: userExist.avatar,
            role: userExist.role,
            isVerified: userExist.isVerified,
        }


        return res.cookie("accessToken",
          token,
        { httpOnly: true,
          expires: expiryDate,
        })
        .status(httpStatusCode.OK)
        .json({ success: true, message: "User signup successfully ", data });

    } catch (error) {
        next(error);
    }
}

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  
   try {
    return res.clearCookie("accessToken").status(httpStatusCode.OK).json({success: true, message: "User logged out successfully"});
   } catch (error) {
    next(error);
   }
}