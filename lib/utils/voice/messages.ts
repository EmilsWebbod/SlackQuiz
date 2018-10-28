import successMessages, { ISuccessMessages } from './messages/successMessages';
import quizMessages, { IQuizMessages } from './messages/quizMessages';
import userMessages, { IUserMessages } from './messages/success/userMessages';
import helpMessages, { IHelpMessages } from './messages/success/helpMessages';

export type IMessages = IQuizMessages &
  ISuccessMessages &
  IUserMessages &
  IHelpMessages;

const messages: IMessages = {
  ...successMessages,
  ...userMessages,
  ...helpMessages,
  ...quizMessages
};

export default messages;
