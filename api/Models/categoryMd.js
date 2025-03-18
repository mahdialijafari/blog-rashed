import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "category title is required"],
    unique: [true, "category title is already taken"],
  },
  icon:{
    type:String
  }
},{
    timestamps:true
});
const Category=mongoose.model('Category',categorySchema)
export default Category
