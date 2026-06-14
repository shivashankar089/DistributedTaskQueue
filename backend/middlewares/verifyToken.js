import { config } from "dotenv";
import jwt from 'jsonwebtoken'
const {verify} = jwt

config();
export const verifyToken = ()=>{
    return((req,res,next)=>{
        const result = req.cookies?.token;
        //if token is not there
        if(!result){
           return res.status(401).json({message:"Please login first..."});
        }
        try{
        const decodedToken = verify(result,process.env.SECRET_KEY);
        req.user = decodedToken;
        next();
        }catch(e){
            return res.status(401).json({message:"Invalid or Token expired"});
        }
    }
    )
}