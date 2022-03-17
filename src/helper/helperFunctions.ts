
import { IuserModel } from "@/models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//verify if the one of the string sequence is empty or not
const verifyStrings=(strings:String[])=>{
    for(let str of strings)
    {
        if (str==undefined||(str.trim()).length==0) return false;
    }

    return true;
}

//hash password
const hashPassword=(password:string):string=>
{
    return bcrypt.hashSync(password,10);
}

//verify the hash password
const validPassword=(password:string,hashedPassword:string):boolean=>{

    return bcrypt.compareSync(password,hashedPassword);
}
//give token with a userModel payload
const giveToken=(user:IuserModel):string=>{
    const {username,email}=user;
    return jwt.sign({username,email},process.env.JWT||"hello");
}

export default{
    verifyString:verifyStrings,
    giveToken:giveToken,
    validPassword:validPassword,
    hashPassword:hashPassword
}as const;