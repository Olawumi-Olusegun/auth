import express, { Application, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectToDatabase } from './database';

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import { ErrorWithStatus } from './types';

dotenv.config();

const app: Application = express();

const PORT = Number(process.env.PORT) || 2020;

const dirname = path.resolve();

app.use(express.json())
app.use(express.static(path.join(dirname, '/Frontend/dist')))
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get("*", (req: Request, res: Response) => {
     res.sendFile(path.join(dirname, "Frontend", "dist", 'index.html'));
});

app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({success: false, message, statusCode });
});

connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`App listening on port:${PORT}`));

})
