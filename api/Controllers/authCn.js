import User from "../Models/userMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = catchAsync(async(req,res,next)=>{
    const {username=null,password=null}=req.body
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
    const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET_JWT)
    return res.status(200).json({
        success:true,
        data:{user:{
            role:user.role,
            username:user.username,
            _id:user._id
        },token},
        message:'login successfully'
    })
})


export const register = catchAsync(async(req,res,next)=>{
    const {password=null,role=null,...others}=req.body
    const passReg=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if(!passReg.test(password)){
        return next(new HandleERROR('invalid password',400))
    }
    const hashPassword=bcryptjs.hashSync(password,10)
    const user=await User.create({...others,password:hashPassword})
    const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET_JWT)
    return res.status(200).json({
        success:true,
        data:{user:{
            role:user.role,
            username:user.username,
            _id:user._id
        },token},
        message:'register successfully'
    })
})