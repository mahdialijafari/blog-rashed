import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
import Post from "../Models/postMd.js";
import Comment from "../Models/commentMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req?.query)
    .filter()
    .paginate()
    .sort()
    .populate()
    .limitFields().secondPopulate('categoryId')
  const posts = await features.query;
  const count = await Post.countDocuments(req?.query?.filters);
  return res.status(200).json({
    success: true,
    data: posts,
    count,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  return res.status(200).json({
    success: true,
    data: post,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("categoryId");
  return res.status(200).json({
    success: true,
    data: post,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: post,
    message: "Post Updated",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  await Comment.deleteMany({postId:id})
  return res.status(200).json({
    success: true,
    message: "Post Removed Successfully",
  });
});
