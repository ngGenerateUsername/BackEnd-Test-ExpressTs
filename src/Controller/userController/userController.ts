import { IuserModel } from "@/models/userSchema";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import helper from "@/helper/helperFunctions";

import ORM from "@/models/userSchema";
const {OK,NOT_ACCEPTABLE,BAD_REQUEST,UNAUTHORIZED} = StatusCodes;

export const  registerUser=async(req:Request,res:Response)=>{
        const {username,email,password}:IuserModel = req.body;
        //verification string empty
        if(!helper.verifyString([username,email,password]))
            return res.status(NOT_ACCEPTABLE).json({status:NOT_ACCEPTABLE, message:"all fields are required!"});

        
        const newPassword:string=helper.hashPassword(password);
        var user = new ORM.userModel({username:username,email:email,password:newPassword}); //preparing the userModel to save
        try {
            await user.save();
        } catch (error) {
            return res.status(BAD_REQUEST).json({status:BAD_REQUEST,message:"POST request error!"})
        }

        return res.status(OK).json({status:OK,message:"Registred succesfully!"});
}


export const loginUser = async(req:Request,res:Response)=>
{
    const {email,password}:IuserModel=req.body;
    try {
        const userModel:IuserModel|null = await  ORM.userModel.findOne({"email":email}).exec();
        //email not exist in DB validation
        if(!userModel) return res.status(UNAUTHORIZED).json({status:UNAUTHORIZED,message:"email not Valid!"});
        //password not correct validation
        if(!helper.validPassword(password,userModel.password)) return res.status(UNAUTHORIZED).json({status:UNAUTHORIZED,message:'password incorrect!'});
        
        //return jwt to the user (LOGIN successfully)
        const signToken = helper.giveToken(userModel);
        return res.status(OK).json({token:signToken});
        
    } catch (error) {
        return res.status(BAD_REQUEST).json({status:BAD_REQUEST,message:'Error while fetchin user!'});    
    }
   
  
  
}

export default {
    register:registerUser,
    login:loginUser
} as const;