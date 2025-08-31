import { verify } from "jsonwebtoken";


export default(req:any,res:any,next:any)=>{
    const token=req.headers.access_token as string;
    if(!token)
    {
        return res.status(500).send('login the user');
    }

    try{
        const decoderedUser=verify(token,process.env.JWT_USER_AUTH!);
        req.user=decoderedUser;
    }catch(error){
        res.status(500).send(error);
    }
    return next();
}