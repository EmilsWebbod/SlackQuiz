import { getRandomMessageFrom } from '../../utils/getMessage';
import { IVoiceMessage } from '../../../../interfaces/voice';

export interface IUserErrors {
  userAlreadyExist: IVoiceMessage;
  unregisteredUser: IVoiceMessage;
  userNameToShort: IVoiceMessage;
}

const userErrors: IUserErrors = {
  userAlreadyExist: getRandomMessageFrom(() => [
    'Wait... I already have you here... You cheeky bastard',
    "I don't think you should play quizes. You can't even remember you already joined this QuizMaster",
    "Yeah sure. Let's have to off the same user playing with 2 names. HOW ABOUT NO!"
  ]),
  unregisteredUser: getRandomMessageFrom(() => [
    'Major error. Cant find this user in my system. Will ignore!',
    'Fuck off.'
  ]),
  userNameToShort: getRandomMessageFrom(() => [
    'Your nick suck! choose another one',
    'Are you stupid? Please give me a better name. It has to be at least 3 characters'
  ])
};

export default userErrors;
