import { interval } from 'rxjs';
import { IRequest, IResponse } from '../../interfaces/express';
import { sendResponse } from '../slack';
import errorsMessages, { IErrorsMessages } from './voice/error';
import conversations, { IConversationList } from './voice/conversations';
import messages, { IMessages } from './voice/messages';

export function response(type: keyof IMessages) {
  return async (req: IRequest, res: IResponse) => {
    sendResponse(messages[type](req));
    return res.status(200).send();
  };
}

export function errorResponse(type: keyof IErrorsMessages = 'default') {
  return async (req: IRequest, res: IResponse) => {
    sendResponse(errorsMessages[type](req));
    return res.status(200).send();
  };
}

export function startConversation(type: keyof IConversationList, delay = 1000) {
  return async (req: IRequest, res: IResponse) => {
    try {
      const messages = conversations[type](req);

      const conversationInterval = interval(delay).subscribe((index) => {
        if (!messages[index]) {
          if (conversationInterval) {
            conversationInterval.unsubscribe();
          }
          return;
        }
        if (messages[index] !== '') {
          sendResponse(messages[index]);
        }
      });
      return res.status(200).send();
    } catch (e) {
      throw e;
    }
  };
}

export function createError(message: string) {
  return message;
}
