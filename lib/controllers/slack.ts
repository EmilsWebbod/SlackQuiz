import { ISlack } from '../interfaces/slack';
import { hello, help, join } from '../utils/match';
import { addUser, getUser } from './user';
import { IRequest, IResponse } from '../interfaces/express';
import { errorResponse, response } from '../utils/voice';

interface IMessageList {
  regEx: RegExp;
  exec: (req: IRequest<ISlack>, res: IResponse) => any;
}

const messageList: IMessageList[] = [
  { regEx: join, exec: addUser },
  { regEx: hello, exec: response('confirm') }
];

export async function message(req: IRequest<ISlack>, res: IResponse) {
  const text = req.body.event.text;

  if (text.match(help)) {
    return await response('help')(req, res);
  }

  if (text.match(join)) {
    await addUser(req, res);
    return await response('userAdded')(req, res);
  }

  await getUser(req, res);

  if (!req.user) {
    return errorResponse('unregisteredUser')(req, res);
  }

  for (const message of messageList) {
    if (text.match(message.regEx)) {
      await message.exec(req, res);
    }
  }
}
