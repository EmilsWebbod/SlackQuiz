import { IRequest, IResponse } from '../interfaces/express';

export async function response(req: IRequest, res: IResponse) {
  console.log('OK');
  return res.send('OK :)');
}

export async function errorResponse(req: IRequest, res: IResponse) {
  return res.send('I fucked up!');
}
