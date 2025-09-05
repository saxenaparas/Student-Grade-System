import mongoose, { Schema, Document } from "mongoose";

export interface IUpload extends Document {
  filename: string;
  count: number;
  createdAt: Date;
}

const UploadSchema: Schema = new Schema(
  {
    filename: { type: String, required: false },
    count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (mongoose.models.Upload as mongoose.Model<IUpload>) ||
  mongoose.model<IUpload>("Upload", UploadSchema);
