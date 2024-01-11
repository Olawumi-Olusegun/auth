import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller';
import { verifyToken } from '../utils/verifyUser';
import { validateSchema } from '../validations';
import { updateSchema } from '../validations/authSchema';

const router = express.Router();


router.post("/user/update/:userId", verifyToken, validateSchema(updateSchema), updateUser);
router.delete("/user/delete/:userId", verifyToken, deleteUser);

export default router;