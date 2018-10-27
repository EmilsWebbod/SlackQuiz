import confirmMessages from './success/confirmMessages';
import userMessages, { IUserMessages } from './success/userMessages';
import { IVoiceMesage } from '../../interfaces/voice';
import helpMessages, { IHelpMessages } from './success/helpMessages';

interface IMessages {
  confirm: IVoiceMesage;
}

export type ISuccessMessages = IMessages & IUserMessages & IHelpMessages;

const successMessages: ISuccessMessages = {
  confirm: confirmMessages,
  ...userMessages,
  ...helpMessages
};

export default successMessages;
