import { ISlack } from '../interfaces/slack';
import { hello, join } from '../utils/match';
import { addUser } from './quiz';
import { IRequest, IResponse } from '../interfaces/express';
import { response } from '../utils/voice';

interface IMessageList {
  regEx: RegExp;
  exec: (req: IRequest<ISlack>, res: IResponse) => any;
}

const messageList: IMessageList[] = [
  { regEx: join, exec: addUser },
  { regEx: hello, exec: response }
];

export async function message(req: IRequest<ISlack>, res: IResponse) {
  const text = req.body.event.text;

  for (const message of messageList) {
    if (text.match(message.regEx)) {
      await message.exec(req, res);
    }
  }
}
