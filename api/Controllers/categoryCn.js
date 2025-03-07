import Category from "../Models/categoryMd.js";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
import Post from "../Models/postMd.js";
import Comment from "../Models/commentMd.js";

export const getAll=catchAsync(async (req,res,next)=>{
  const features=new ApiFeatures(Category,req?.query).filter().paginate().sort().populate().limitFields()
  const categories=await features.query
  const count=await Category.countDocuments(req?.query?.filters)
  return res.status(200).json({
    success:true,
    data:categories,
    count,
  })
})

export const create=catchAsync(async (req,res,next)=>{
    const category=await Category.create(req.body)
    return res.status(200).json({
      success:true,
      data:category,
    })
  })


export const getOne=catchAsync(async (req,res,next)=>{
  const {id}=req.params
  const category=await Category.findById(id)
  return res.status(200).json({
    success:true,
    data:category,
  })
})


export const update=catchAsync(async (req,res,next)=>{
  const {id}=req.params
  const category=await Category.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
  })
  return res.status(200).json({
    success:true,
    data:category,
    message:'Category Updated'
  })
})



export const remove=catchAsync(async (req,res,next)=>{
    const {id}=req.params
    await Category.findByIdAndDelete(id)
    const posts=await Post.deleteMany({categoryId:id})
    for(let post of posts){
        await Comment.deleteMany({postId:post._id})
    }
    return res.status(200).json({
      success:true,
      message:'Category Removed Successfully'
    })
  })
  