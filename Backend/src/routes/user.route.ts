import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller';
import { verifyToken } from '../utils/verifyUser';

const router = express.Router();


router.post("/user/update/:userId", verifyToken, updateUser);
router.delete("/user/delete/:userId", verifyToken, deleteUser);

export default router;