import { IVoiceMesage } from '../../../interfaces/voice';
import { getRandomMessageFrom } from '../utils/getMessage';

export interface IHelpMessages {
  help: IVoiceMesage;
}

const helpMessages = {
  help: getRandomMessageFrom(() => [
    `
Welcome to Quizmaster 1337!
I see you are not knowing of my extreme knowledge! Maybe this will help you!
Commands:
help ( super helpful right? :sweat_smile: )
join "name" (length > 2)
startQuiz q=number c=categoryNumber (Not implemented)
    `
  ])
};

export default helpMessages;
