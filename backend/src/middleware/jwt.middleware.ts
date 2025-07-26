import { User } from "../model/user.model";
import jwt from "jsonwebtoken";


export const generateUserToken=(user:User)=>{
const token=jwt.sign({
        id:user.id,email:user.email,name:user.name
    },process.env.JWT_USER_AUTH!,{
       expiresIn:"1000d"
    })
return {
        id:user.id,
name:user.name,
email:user.email,
dob:user.dob,
contact:user.contact,
role:user.role,
isLogin:true,
token:token,
      };
}