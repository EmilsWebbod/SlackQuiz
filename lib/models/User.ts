import { mongoose } from '../config/db';

export interface IUser extends mongoose.Document {
  api_app_id: string;
  team_id: string;
  user: string;
  channel: string;
  name: string;
  score: number;
}

export interface IUserStatics extends mongoose.Model<IUser> {
  addUserScore: (user: string, score: number) => void;
  getTop5: () => IUser[];
}

const UserSchema = new mongoose.Schema({
  api_app_id: { type: String, required: true, index: true },
  team_id: { type: String, required: true, index: true },
  user: { type: String, required: true, index: true, unique: true },
  channel: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  score: { type: Number, default: 0 }
});

UserSchema.statics.addUserScore = async function(user: string, score: number) {
  await this.findOneAndUpdate(
    { user },
    {
      $inc: { score }
    },
    {
      new: true
    }
  );
};

UserSchema.statics.getTop5 = function() {
  return this.find({}, ['name', 'score'], { limit: 5, sort: { score: 1 } });
};

let User: IUserStatics;

if (!User) {
  User = mongoose.model<IUser, IUserStatics>('User', UserSchema);
}

export default User;
