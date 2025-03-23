import Comment from "../Models/commentMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Comment, req.query) // Corrected req.query
        .filter()
        .paginate()
        .sort()
        .populate()
        .limitFields()
        .secondPopulate({ path: 'userId', select: 'username' });

    const comments = await features.query;
    const count = await Comment.countDocuments(req.query.filters); // Corrected countDocuments

    return res.status(200).json({
        success: true,
        data: comments,
        count
    });
});

export const getPostComment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id, isActive: true }).populate('userId', 'username'); // Ensure user data is populated
    return res.status(200).json({
        success: true,
        data: comments,
    });
});

export const create=catchAsync(async(req,res,next)=>{
    const comment=await Comment.create({content:req.body.content,postId:req.body.postId,userId:req.userId})
    return res.status(200).json({
        success:true,
        data:comment,
    })
})
export const changeActivity=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const comment=await Comment.findById(id)
    comment.isActive=!comment.isActive
    const newComment=await comment.save()
    return res.status(200).json({
        success:true,
        data:newComment,
        message:'change activity successfully'
    })
})
export const remove=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    await Comment.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        message:'comment remove successfully'
    })
})