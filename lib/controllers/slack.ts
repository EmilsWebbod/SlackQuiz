import { ISlack } from '../interfaces/slack';
import {
  all,
  hello,
  help,
  join,
  leaderBoard,
  next,
  quizHelp,
  start,
  stop
} from '../utils/match';
import { addUser, getUser } from './user';
import { IRequest, IResponse } from '../interfaces/express';
import { errorResponse, response } from '../utils/ai/voice';
import {
  answerQuiz,
  getActiveQuiz,
  getLeaderBoard,
  isQuizActive,
  nextQuestion,
  startQuiz,
  stopQuiz
} from './quiz';
import Slack from '../models/Slack';

interface IMessageList {
  regEx: RegExp;
  exec: (req: IRequest<ISlack>, res: IResponse) => Promise<any>;
}

const noUserList: IMessageList[] = [
  { regEx: help, exec: response('help') },
  { regEx: join, exec: addUser }
];

const quizList: IMessageList[] = [
  { regEx: stop, exec: stopQuiz },
  { regEx: next, exec: nextQuestion },
  { regEx: quizHelp, exec: response('quizHelp') },
  { regEx: all, exec: answerQuiz }
];

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
  const matchMessageWithList = matchMessage(text, req, res);

  if (await matchMessageWithList(noUserList)) {
    return;
  }

  try {
    await getUser(req, res);

    if (!req.user) {
      return errorResponse('unregisteredUser')(req, res);
    }

    if (isQuizActive()) {
      req.quiz = getActiveQuiz();
      if (await matchMessageWithList(quizList)) {
        return;
      }
    }

    if (await matchMessageWithList(messageList)) {
      return;
    }
  } catch (e) {
    return errorResponse('default')(req, res);
  }
}

function matchMessage(text: string, req: IRequest<ISlack>, res: IResponse) {
  return async (messageList: IMessageList[]): Promise<boolean> => {
    for (const message of messageList) {
      if (text.match(message.regEx)) {
        await message.exec(req, res);
        return true;
      }
    }
    return false;
  };
}
