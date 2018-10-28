import { mongoose } from '../config/db';
import { ISlack } from '../interfaces/slack';
import { IRequest, IResponse } from '../interfaces/express';
import { createError, errorResponse } from '../utils/voice';
import { IUser } from '../models/User';

const User = mongoose.model<IUser>('User');

export async function addUser(req: IRequest<ISlack>, res: IResponse) {
  try {
    const name = req.body.event.text.match(/join\s(.+)/);
    if (!name || name[1].length < 3) {
      return errorResponse('userNameToShort')(req, res);
    }
    req.user = await User.create({
      api_app_id: req.body.api_app_id,
      team_id: req.body.team_id,
      channel: req.body.event.channel,
      user: req.body.event.user,
      name: name[1]
    });
  } catch (e) {
    console.error(e);
    await errorResponse('userAlreadyExist')(req, res);
  }
}

export async function getUser(req: IRequest<ISlack>, res: IResponse) {
  try {
    req.user = await User.findOne({
      user: req.body.event.user
    }).lean();
  } catch (e) {
    throw createError('No user');
  }
}
