import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"post title is required"],
        unique:[true,"post title is already taken"]
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:[true,"description is required"],
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
    }
},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema)
export default Post