import exp from 'express'
import { userModel } from '../models/userModel.js';
import {hash,compare} from 'bcryptjs'
import {config} from 'dotenv'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js';
import multer from "multer"

const upload = multer()

export const userApp = exp.Router();
const {sign} = jwt;
config();

//Route for register
userApp.post('/register',upload.none(),async(req,res)=>{
   //Requesting data
   const newUser = req.body;
   let containsemail = await userModel.findOne({email:newUser.email});
   if(containsemail){
    return res.json({message:"Email already exists..."});
   }
   //hashing password
   const newPassword = await hash(newUser.password,12);
   newUser.password = newPassword;
   //creating user
   let response = await userModel.create(newUser);
   //sending response
   if(response){
   res.status(201).json({message:"User registered Successfully"});
   }
   else{
    res.status(400).json({message:"User registration failed.."});
   }
})


//Route for login
userApp.post('/login',upload.none(),async(req,res)=>{
    const {email,password} = req.body;
    //find user by email
    let result = await userModel.findOne({email:email});
    //send response if email is not matched
    if(!result){
        return res.status(400).json({message:"Email not found"});
    }
    //compare passwords
    let isMatch = await compare(password,result.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid password"});
    }
    //create jwt
    const signedToken = sign(
        {
            id: result._id,
            email: result.email
        },
            process.env.SECRET_KEY,
        {
            expiresIn:"1h"
        }
    );
    //send cookie in response
    res.cookie("token",signedToken,
        {
            httpOnly:true,
            secure:true,
            sameSite:"none"
        })
        //response for successful login
        res.status(201).json({message:"Login Successful..."});
})


//Route for logout
userApp.post('/logout',verifyToken(),(req,res)=>{
res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:"none"
});
res.status(200).json({message:"Logout successful..."})
})


//Route for updating
userApp.put('/update', verifyToken(), async(req,res)=>{

    const updateUser = req.body;

    const userId = req.user?.id;

    let response = await userModel.findByIdAndUpdate(
        userId,
        updateUser,
        { new:true }
    );

    if(!response){
        return res.json({
            message:"Cannot update user"
        });
    }

    return res.json({
        message:"User updated successfully...",
        payload:response
    });

})

userApp.delete('/delete', verifyToken(), async(req,res)=>{

    const userId = req.user?.id;

    // extract document
    let userObjDocument = await userModel.findById(userId);

    if(!userObjDocument){
        return res.json({
            message:"User not found"
        });
    }

    // update document
    userObjDocument.isUserActive = false;

    // save changes
    await userObjDocument.save();

    return res.json({
        message:"User deleted successfully..."
    });

})

//Route to get user details
userApp.get('/details',verifyToken(),upload.none(),async(req,res)=>{
    const userId = req.user?.id;
    const userObj = await userModel.findById(userId);
    if(!userObj){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({message:"User Details are : ",payLoad:userObj});
})