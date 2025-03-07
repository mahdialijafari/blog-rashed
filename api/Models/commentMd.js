import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:[true,'content is required'],
        maxlength:[150,'max length is 150 character'],
        trim:true
    },
    isActive:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

const Comment=mongoose.model('Comment',commentSchema)
export default Comment