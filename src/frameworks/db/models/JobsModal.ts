import mongoose, { Document, Schema } from "mongoose";

export interface IJobTypes extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  minimum_wage: number;
  isBlock: boolean;

  image: string;
}

const jobSchema = new Schema<IJobTypes>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minimum_wage: {
    type: Number,
    required: true,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "",
  },
});

export const JobModel = mongoose.model("Jobs", jobSchema);
