import {  Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import UserModel from '../models/user.model';
import { httpStatusCode } from '../utils/httpStatusCodes';
import { RequestWithUserId } from '../types';


export const updateUser = async (req: RequestWithUserId, res: Response, next: NextFunction) => {

    const { userId } = req.params;
    const currentUserId = req.userId;

    let { username, email, password, avatar } = req.body;

    const dataToUpdate = { username, email, password, avatar  }

    if(!isValidObjectId(currentUserId)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials!"});
    }

    if(!isValidObjectId(userId)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid userId!"});
    }

    if(currentUserId !== userId) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials!!"});
    }

    const userExist = await UserModel.findById(userId);

    if(!userExist) {
        return res.status(httpStatusCode.NOT_FOUND).json({success: false, message: "User not found"});
    }

    if(!password) {
        delete dataToUpdate.password;
    }

    try {

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            $set: dataToUpdate
        }, { new: true } );

    if(!updateUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Unable to update user"});
    }

    const data = {
        id: updatedUser?.id,
        username: updatedUser?.username,
        email: updatedUser?.email,
        avatar: updatedUser?.avatar,
        isVerified: updatedUser?.isVerified,
    }

    return res.status(httpStatusCode.OK).json({success: false, message: "User updated successfully", data});

    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req: RequestWithUserId, res: Response, next: NextFunction) => {

    const { userId } = req.params;

    const currentUserId = req.userId;

    if(!isValidObjectId(currentUserId)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials"});
    }

    if(currentUserId !== userId) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Invalid credentials"});
    }

    try {

        const deletedUser = await UserModel.findByIdAndDelete(userId);

    if(!deletedUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({success: false, message: "Unable to delete user"});
    }

    return res.status(httpStatusCode.OK).json({success: true, message: "User deleted"});

    } catch (error) {
        next(error);
    }
}