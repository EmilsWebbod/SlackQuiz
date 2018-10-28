import { ISlack } from '../interfaces/slack';
import { hello, help, join, leaderBoard, start } from '../utils/match';
import { addUser, getUser } from './user';
import { IRequest, IResponse } from '../interfaces/express';
import { errorResponse, response } from '../utils/voice';
import {
  answerQuiz,
  getActiveQuiz,
  getLeaderBoard,
  isQuizActive,
  startQuiz
} from './quiz';
import Slack from '../models/Slack';

interface IMessageList {
  regEx: RegExp;
  exec: (req: IRequest<ISlack>, res: IResponse) => any;
}

const messageList: IMessageList[] = [
  { regEx: hello, exec: response('confirm') },
  { regEx: start, exec: startQuiz },
  { regEx: leaderBoard, exec: getLeaderBoard }
];

export async function message(req: IRequest<ISlack>, res: IResponse) {
  const { alreadyExist } = await Slack.findOrAdd(req.body);
  if (alreadyExist) {
    return res.status(208).send();
  }

  const text = req.body.event.text;

  if (text.match(help)) {
    return await response('help')(req, res);
  }

  if (text.match(join)) {
    await addUser(req, res);
    return await response('userAdded')(req, res);
  }

  try {
    await getUser(req, res);

    if (isQuizActive()) {
      req.quiz = getActiveQuiz();
      return answerQuiz(req, res);
    }

    if (!req.user) {
      return errorResponse('unregisteredUser')(req, res);
    }

    for (const message of messageList) {
      if (text.match(message.regEx)) {
        return await message.exec(req, res);
      }
    }

    return errorResponse('default');
  } catch (e) {
    return errorResponse('default');
  }
}
