import mongoose,{ Schema,Document,model } from "mongoose";


export interface IuserModel extends Document
{
    username:string,
    email:string,
    password:string
}

var userSchema:Schema<IuserModel> =new mongoose.Schema<IuserModel>({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
export default  {
    userModel:model<IuserModel>("user",userSchema)
} as const;
