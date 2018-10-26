import * as express from 'express';
import { IRequest, IResponse } from '../interfaces/express';
import { ISlack, ISlackHandShake } from '../interfaces/slack';
import { message } from '../controllers/slack';

const slack = express();

slack.use(
  '/',
  async (req: IRequest<ISlackHandShake | ISlack>, res: IResponse) => {
    console.log('Body', req.body);
    console.log('Query', req.query);
    if ('challenge' in req.body) {
      return res.send(req.body.challenge);
    }

    // @ts-ignore
    const request: IRequest<ISlack> = req;

    switch (req.body.event.type) {
      case 'message':
        await message(request, res);
    }
  }
);

export default slack;
