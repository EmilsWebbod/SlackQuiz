import { mongoose } from '../config/db';
import { ISlack } from '../interfaces/slack';

export type ISlackSchema = ISlack & mongoose.Document;

interface ISlackStatics extends mongoose.Model<ISlackSchema> {
  findOrAdd: (
    new_message: ISlack
  ) => { alreadyExist: boolean; message: ISlackStatics };
}

const SlackSchema = new mongoose.Schema({
  event_id: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  team_id: { type: String, required: true },
  api_app_id: { type: String, required: true },
  type: { type: String, required: true },
  event_time: { type: String, default: new Date() },
  authed_users: { type: [String] },
  event: {
    type: { type: String },
    user: { type: String },
    text: { type: String },
    client_msg_id: { type: String },
    ts: { type: String },
    channel: { type: String },
    event_ts: { type: String },
    channel_type: { type: String },
    subtype: { type: String }
  }
});

SlackSchema.statics.findOrAdd = async function(new_message: ISlack) {
  const alreadyExist = await this.findOne({ event_id: new_message.event_id });
  let message: ISlackStatics;

  if (!alreadyExist) {
    message = await this.create(new_message);
  }

  return {
    alreadyExist,
    message
  };
};

let Slack: ISlackStatics;

if (!Slack) {
  Slack = mongoose.model<ISlackSchema, ISlackStatics>('Slack', SlackSchema);
}

export default Slack;
