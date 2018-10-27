import { getRandomMessageFrom } from '../utils/getMessage';
import { IRequest } from '../../../interfaces/express';
import { IVoiceMesage } from '../../../interfaces/voice';

export interface IUserMessages {
  userAdded: IVoiceMesage;
}

const userMessages: IUserMessages = {
  userAdded: getRandomMessageFrom((req: IRequest) => [
    `I knew you would come around ${req.user.name}! Welcome to Quizmaster 1337`,
    `I hope you read the terms & agreements ${req.user.name}. :smiling_imp:`
  ])
};

export default userMessages;
