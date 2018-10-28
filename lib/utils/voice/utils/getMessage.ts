import { getRandomInt } from '../../math';
import { IRequest } from '../../../interfaces/express';

export function getRandomMessageFrom(messages: (req: IRequest) => string[]) {
  return (req: IRequest): string => {
    return messages(req)[getRandomInt(0, messages.length - 1)];
  };
}

export function startConversationFrom(messages: (req: IRequest) => string[]) {
  return (req: IRequest): string[] => {
    return messages(req);
  };
}
