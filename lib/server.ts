import * as express from 'express';
import * as bodyParser from 'body-parser';
// import bootstrapDatabase from './config/db';
import bootstrapDatabase from './config/db';
import slack from './routes/slack';

// Bootstrap mongoDB
bootstrapDatabase();

const app = express();
const env = process.env.NODE_ENV || 'development';
const port =
  process.env.PORT ||
  (process && typeof process.getuid === 'function' && process.getuid()) ||
  1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req: any, res: any) {
  res.send('QuizMaster 1337 on duty!');
});

app.use('/slack', slack);

app.listen(port, () => {
  console.log(`App is running in ${env}-mode`);
  console.log('Press CTRL-C to stop\n');
});

export default app;
