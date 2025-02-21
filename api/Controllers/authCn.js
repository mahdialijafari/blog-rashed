import User from "../Models/userMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = catchAsync(async(requestAnimationFrame,resizeBy,next)=>{
    const {username=null,password=null}=requestAnimationFrame.body
    if(!username || !password){
        return next(new HandleERROR('username and password is required',400))
    }
    const user=await User.findOne({username})
    if(!user){
        return next(new HandleERROR('username or password incorrect',400))
    }
    const checkPassword=bcryptjs.compareSync(password,user.password)
    if(!checkPassword){
        return next(new HandleERROR('username or password incorrect',400))
    }
    const token=jwt.sign({id:user._id,role:user.role},)
    return res.status(200).json({
        success:true,
        data:{user,token},
        message:'login successfully'
    })
})