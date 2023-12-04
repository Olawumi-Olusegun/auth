
import express from 'express';
import { google, signin, signup, signout } from '../controllers/auth.controller';

const router = express.Router();

router.post("/auth/signup", signup)
router.post("/auth/signin", signin)
router.post("/auth/google", google)
router.get("/auth/signout", signout)

export default router;