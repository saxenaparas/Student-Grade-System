import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  student_id: string;
  student_name: string;
  total_marks: number;
  marks_obtained: number;
  percentage: number;
  createdAt: Date;
}

const StudentSchema: Schema = new Schema(
  {
    student_id: { type: String, required: true },
    student_name: { type: String, required: true },
    total_marks: { type: Number, required: true },
    marks_obtained: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (mongoose.models.Student as mongoose.Model<IStudent>) ||
  mongoose.model<IStudent>("Student", StudentSchema);
