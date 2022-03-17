import { Router } from "express";
import productController from "@/Controller/productController/productController";
import auth from "@/middleware/auth";

const routerProduct:Router = Router();


routerProduct.post('/add',productController.addProduct);
routerProduct.get('/all',auth.AuthToken,productController.getAll);


export default routerProduct;