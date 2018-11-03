import { IVoiceMessage } from '../../../../../interfaces/voice';
import { getRandomMessageFrom } from '../../utils/getMessage';

export interface IHelpMessages {
  help: IVoiceMessage;
}

const helpMessages = {
  help: getRandomMessageFrom(() => [
    `
Welcome to Quizmaster 1337!
I see you are not knowing of my extreme knowledge! Maybe this will help you!
Commands:
help ( super helpful right? :sweat_smile: )
join "name" (length > 2)
start --amount number --category=categoryNumber
  .stop (To stop an active quiz)
  .next (Get next question in quiz)
  .help (Gives you 4 alternatives)
    `
  ])
};

export default helpMessages;
