import * as express from 'express';
import { IRequest, IResponse } from '../interfaces/express';
import { ISlack, ISlackHandShake } from '../interfaces/slack';
import { message } from '../controllers/slack';

const slack = express();

slack.use(
  '/',
  async (req: IRequest<ISlackHandShake | ISlack>, res: IResponse) => {
    if ('challenge' in req.body) {
      return res.send(req.body.challenge);
    }

    if (!('event' in req.body)) {
      return res.status(400).json({
        status: 400,
        message: 'This is a slack endpoint',
        error: 'Wrong slack object'
      });
    }

    // @ts-ignore
    const request: IRequest<ISlack> = req;

    if (req.body.event.subtype === 'bot_message') {
      return res.status(200).send();
    }

    switch (req.body.event.type) {
      case 'message':
        await message(request, res);
    }
  }
);

export default slack;
