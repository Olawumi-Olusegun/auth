
import express from 'express';
import { google, signin, signup, signout } from '../controllers/auth.controller';
import { validateSchema } from '../validations';
import { signInSchema, signUpSchema } from '../validations/authSchema';

const router = express.Router();

router.post("/auth/signup", validateSchema(signUpSchema), signup)
router.post("/auth/signin", validateSchema(signInSchema), signin);
router.post("/auth/google", google);
router.get("/auth/signout", signout);

export default router;