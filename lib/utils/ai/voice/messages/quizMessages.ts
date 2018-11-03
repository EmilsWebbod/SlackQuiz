import { getRandomMessageFrom } from '../utils/getMessage';
import { IRequest } from '../../../../interfaces/express';
import { IVoiceMessage } from '../../../../interfaces/voice';
import defaultErrors from './error/defaultErrors';
import { getPlaceString } from '../../../../controllers/quiz/text';

export interface IQuizMessages {
  top5: IVoiceMessage;
  quizAlmostCorrect: IVoiceMessage;
  quizAlreadyEnded: IVoiceMessage;
  quizSendQuestion: IVoiceMessage;
  quizHelp: IVoiceMessage;
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
  },
  quizAlreadyEnded: getRandomMessageFrom(() => [
    ":thinking_face: I can't stop a quiz that doesn't exist, stupid.",
    'Stopped the quiz. Oh wait, there is no quiz active.',
    "stop.... Stop....... STOP........ STOP!!!!!!!!!! Does'nt work"
  ]),
  quizSendQuestion: (req) => {
    return req.quiz.getQuestion();
  },
  quizHelp: (req) => {
    return req.quiz.getMultipleChoice();
  }
};

export default quizMessages;
