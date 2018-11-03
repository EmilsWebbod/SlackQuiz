import confirmMessages from './success/confirmMessages';
import { IVoiceMessage } from '../../../../interfaces/voice';

export interface ISuccessMessages {
  confirm: IVoiceMessage;
}

const successMessages: ISuccessMessages = {
  confirm: confirmMessages
};

export default successMessages;
