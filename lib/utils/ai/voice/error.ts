import userErrors, { IUserErrors } from './messages/error/userErrors';
import defaultErrors from './messages/error/defaultErrors';
import { IVoiceMessage } from '../../../interfaces/voice';

interface IErrors {
  default: IVoiceMessage;
}

type IErrorsMessages = IErrors & IUserErrors;

const errorsMessages = {
  default: defaultErrors,
  ...userErrors
};

export default errorsMessages;
export { IErrorsMessages };
