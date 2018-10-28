import { getRandomMessageFrom } from '../utils/getMessage';
import { IRequest } from '../../../interfaces/express';
import { IVoiceMessage } from '../../../interfaces/voice';
import defaultErrors from './error/defaultErrors';
import { getPlaceString } from '../../string';

export interface IQuizMessages {
  top5: IVoiceMessage;
  quizAlmostCorrect: IVoiceMessage;
}

const quizMessages: IQuizMessages = {
  top5: getRandomMessageFrom((req: IRequest) => {
    const top5 = req.top5;
    if (!top5) {
      return [defaultErrors(req)];
    }
    return [
      `
Leaderboard
${top5.map((user, i) => `${getPlaceString(i)}: ${user.name} - ${user.score}\n`)}
    `
    ];
  }),
  quizAlmostCorrect: (req) => {
    return `${req.message}`;
  }
};

export default quizMessages;
