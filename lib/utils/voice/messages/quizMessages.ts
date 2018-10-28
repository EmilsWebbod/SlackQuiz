import { getRandomMessageFrom } from '../utils/getMessage';
import { IRequest } from '../../../interfaces/express';
import { IVoiceMessage } from '../../../interfaces/voice';

export interface IQuizMessages {
  quizStart: IVoiceMessage;
}

const quizMessages: IQuizMessages = {
  quizStart: getRandomMessageFrom((req: IRequest) => {
    if (!req.quiz) {
      return ['OhNo.... I seemed to have missed my quiz notes :cry:'];
    }
    return [
      `
WOHO!! Quiz is not LIVE!!! LETS GET READY TO RUUUMMMBLEEEEEEE!

`
    ];
  })
};

export default quizMessages;
