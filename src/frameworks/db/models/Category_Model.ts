import mongoose, { Document, Schema } from "mongoose"
export interface ICategory extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  isBlock:boolean
}
const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required:true

  },
  isBlock:{
    type:Boolean,
    default:false
  },
},{timestamps:true});

export const CategoryModel = mongoose.model('Category', categorySchema);

 