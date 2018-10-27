import { IRequest, IResponse } from '../interfaces/express';
import { sendResponse } from './slack';
import successMessages, { ISuccessMessages } from './voice/success';
import errorsMessages, { IErrorsMessages } from './voice/error';

export function response(type: keyof ISuccessMessages) {
  return async (req: IRequest, res: IResponse) => {
    sendResponse(successMessages[type](req));
    return res.status(200).send();
  };
}

export function errorResponse(type: keyof IErrorsMessages = 'default') {
  return async (req: IRequest, res: IResponse) => {
    sendResponse(errorsMessages[type](req));
    return res.status(200).send();
  };
}
