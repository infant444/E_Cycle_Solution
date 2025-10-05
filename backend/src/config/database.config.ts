import { v2 as cloudinary } from 'cloudinary';


export const cloudinaryConnect=()=>{
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME!, 
            api_key: process.env.CLOUD_APIKEY!, 
            api_secret: process.env.CLOUD_API_SECRATEKEY! 
        });
}
