import { getRandomInt } from '../../../math';
import { IRequest } from '../../../../interfaces/express';

export function getRandomMessageFrom(messages: (req: IRequest) => string[]) {
  return (req: IRequest): string => {
    const messageList = messages(req);
    return messageList[getRandomInt(0, messageList.length - 1)];
  };
}

export function startConversationFrom(messages: (req: IRequest) => string[]) {
  return (req: IRequest): string[] => {
    try {
      return messages(req);
    } catch (e) {
      throw e;
    }
  };
}
