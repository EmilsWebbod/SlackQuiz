import { mongoose } from '../config/db';
import { ISlack } from '../interfaces/slack';
import { IRequest, IResponse } from '../interfaces/express';
import { errorResponse } from '../utils/voice';

const User = mongoose.model('User');

export async function addUser(req: IRequest<ISlack>, res: IResponse) {
  try {
    return await User.create({
      api_app_id: req.body.api_app_id,
      team_id: req.body.team_id,
      channel: req.body.event.channel,
      user: req.body.event.user
    });
  } catch (e) {
    errorResponse(req, res);
  }
}
