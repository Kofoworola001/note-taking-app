import express, { Request, Response, NextFunction } from 'express'
import User from "../model/UserModel";
import { Session, SessionData } from 'express-session';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export function generateAccessToken(user: any) {
    const payload = {
        email: user.email,
        id: user.id,
    };
    const secret: any = process.env.secret;
    const options = { expiresIn: "1h" };

    return jwt.sign(payload, secret, options);
}




interface AccessTokenPayload extends JwtPayload {
    email: string;
    id: string;
}

export interface CustomRequest extends Request {
    user?: AccessTokenPayload;
    session: Session & Partial<SessionData> & { token?: string, userId?: string, flash?: any, fullName?: string };
}


export function verifyAccessToken(token: string) {
    const secret: any = process.env.secret;

    try {
        const decoded = jwt.verify(token, secret) as AccessTokenPayload;
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, data: (error as Error).message };
    }
}

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.session.token;
    const userId = req.session.id;

    if (!token) {
        const err = new Error('Missing or invalid token');
        return next(err);
    }

    const result = verifyAccessToken(token);
    if (!result.success) {
        const err = new Error('Missing or invalid token');
        return next(err)
    }

    res.redirect("/users/dashboard");
    // res.status(200).json({ message: 'Login successful', token })

}