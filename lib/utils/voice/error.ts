import userErrors, { IUserErrors } from './error/userErrors';
import defaultErrors from './error/defaultErrors';
import { IVoiceMesage } from '../../interfaces/voice';

interface IErrors {
  default: IVoiceMesage;
}

type IErrorsMessages = IErrors & IUserErrors;

const errorsMessages = {
  default: defaultErrors,
  ...userErrors
};

export default errorsMessages;
export { IErrorsMessages };
