import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


const { UNAUTHORIZED, OK } = StatusCodes;
const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'unauthorized' });

    try {
        verify(token, process.env.JWT || "hello");
        next();
    } catch (error) {
        res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'unvalid TOKEN' })
    }
}

export default {
    AuthToken: authUser
} as const;