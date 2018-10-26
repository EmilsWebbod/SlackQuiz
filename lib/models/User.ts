import { mongoose } from '../config/db';

const User = new mongoose.Schema({
  api_app_id: { type: String, required: true, index: true },
  team_id: { type: String, required: true, index: true },
  user: { type: String, required: true, index: true },
  channel: { type: String, required: true, index: true }
});

export default mongoose.model('User', User);
