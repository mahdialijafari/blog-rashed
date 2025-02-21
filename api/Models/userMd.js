import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:[true,'username is already taken'],
    },
    email:{
        type:String,
        required:[true,'username is required'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,'invalid email'],
    },
    role:{
        type:String,
        default:'user',
        enum:['admin','user']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User