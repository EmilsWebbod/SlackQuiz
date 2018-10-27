import { mongoose } from '../config/db';

export interface IUser extends mongoose.Document {
  api_app_id: string;
  team_id: string;
  user: string;
  channel: string;
  name: string;
}

const User = new mongoose.Schema({
  api_app_id: { type: String, required: true, index: true },
  team_id: { type: String, required: true, index: true },
  user: { type: String, required: true, index: true, unique: true },
  channel: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true }
});

export default mongoose.model<IUser>('User', User);
