import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
// import bootstrapDatabase from './config/db';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index';
import slack from './routes/slack';
import bootstrapDatabase from './config/db';

dotenv.config();

// Bootstrap mongoDB
bootstrapDatabase();

const server = new ApolloServer({
  schema,
  context: (req: Request, res: Response) => ({
    req,
    res
  })
});

const app = express();
const env = process.env.NODE_ENV || 'development';
const port =
  process.env.PORT ||
  (process && typeof process.getuid === 'function' && process.getuid()) ||
  1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.applyMiddleware({ app, path: '/graphql' });

app.get('/', function(req: any, res: any) {
  res.send('QuizMaster 1337 on duty!');
});

app.use('/slack', slack);

app.listen(port, () => {
  console.log(`App is running in ${env}-mode`);
  console.log('Press CTRL-C to stop\n');
});

export default app;
