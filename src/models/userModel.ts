import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;   
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
