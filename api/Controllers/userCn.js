import User from "../Models/userMd.js";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";

export const getAll=catchAsync(async (req,res,next)=>{
  const features=new ApiFeatures(User,req?.query).filter().paginate().sort().populate().limitFields()
  const users=await features.query
  const count=await User.countDocuments(req?.query?.filters)
  return res.status(200).json({
    success:true,
    data:users,
    count,
  })
})


export const getOne=catchAsync(async (req,res,next)=>{
  const {id}=req.params
  if(req.userId!=id&&req.role!='admin'){
    return next(new HandleERROR("you don't have a permision",401))
  }
  const user=await User.findById(id).select("-password -__v")
  return res.status(200).json({
    success:true,
    data:user,
  })
})


export const update=catchAsync(async (req,res,next)=>{
  const {id}=req.params
  if(req.userId!=id&&req.role!='admin'){
    return next(new HandleERROR("you don't have a permision",401))
  }
  const user=await User.findByIdAndUpdate(id,req.body,{
    new:trur,
    runValidators:true,
  }).select("-password -__v")
  return res.status(200).json({
    success:true,
    data:user,
  })
})

