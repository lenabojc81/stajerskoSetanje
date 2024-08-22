// models/users.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  admin: boolean;
  _id: mongoose.Types.ObjectId; 
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
