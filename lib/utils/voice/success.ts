import confirmMessages from './messages/success/confirmMessages';
import userMessages, { IUserMessages } from './messages/success/userMessages';
import { IVoiceMessage } from '../../interfaces/voice';
import helpMessages, { IHelpMessages } from './messages/success/helpMessages';

interface IMessages {
  confirm: IVoiceMessage;
}

export type ISuccessMessages = IMessages & IUserMessages & IHelpMessages;

const successMessages: ISuccessMessages = {
  confirm: confirmMessages,
  ...userMessages,
  ...helpMessages
};

export default successMessages;
