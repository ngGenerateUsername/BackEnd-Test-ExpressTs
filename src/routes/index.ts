import { Router } from "express";
import routerProduct from "./product/product";
import userRouter from "./user/user";
const routers=Router();



routers.use('/user',userRouter);
routers.use('/product',routerProduct);
export default routers;