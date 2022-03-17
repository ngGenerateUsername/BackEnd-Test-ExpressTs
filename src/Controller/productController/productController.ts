import { Request, Response } from "express";
import ORM, { IProduct } from '@/models/productSchema'
import helper from "@/helper/helperFunctions";
import { StatusCodes } from "http-status-codes";

const { OK, NOT_FOUND, NOT_ACCEPTABLE, BAD_REQUEST } = StatusCodes;

//ADD Product
const createProduct = async (req: Request, res: Response) => {
    const products: IProduct = req.body;
    if (!helper.verifyString([products.title, products.price.toString()])) return res.status(NOT_ACCEPTABLE).json({ status: NOT_ACCEPTABLE, message: 'Title and prive are required' });

    const product: IProduct = new ORM.productModel(products);

    try {
        await product.save();
    } catch (error) {
        console.log(error);
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: 'ERROR WHILE ADDING PRODUCT TO DB!' });
    }

    return res.status(OK).json({ status: OK, message: 'PRODUCT ADDED SUCCEFULLY!' });

}

//get all products
const getAllProduct = async (req:Request,res:Response)=>
{
    const products:IProduct[]= await ORM.productModel.find({}).exec();
    if(products.length==0) return res.status(NOT_FOUND).json(products);
    return res.status(OK).json(products);
}

export default {
    addProduct:createProduct,
    getAll:getAllProduct
} as const;