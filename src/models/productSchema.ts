import mongoose,{Document,Schema} from "mongoose";

export interface IProduct extends Document
{
    title:string,
    description:string,
    img:string,
    price:number

}

const productSchema:Schema<IProduct> = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    img:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    }
});

export default {
    productModel: mongoose.model<IProduct>('product',productSchema)
} as const;
//middleWare for tomorrow
