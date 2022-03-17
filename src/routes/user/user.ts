import { NextFunction, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userController from "@/Controller/userController/userController";

const userRouter = Router();
const {OK} = StatusCodes;

//register
userRouter.post('/register',userController.register);
userRouter.post('/login', userController.login);





export default userRouter;