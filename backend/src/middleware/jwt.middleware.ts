import { User } from "../model/user.model";
import jwt from "jsonwebtoken";


export const generateUserToken=(user:User)=>{
const token=jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name,
        role:user.role
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
profile:user.profile,
position:user.position,
isLogin:true,
is_active:user.is_active,
token:token,
login_time:user.login_time,
created_at:user.createdat
      };
}