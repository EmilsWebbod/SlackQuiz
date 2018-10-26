import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
// import bootstrapDatabase from './config/db';
import handleCors from './config/cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index';

dotenv.config();

// Bootstrap mongoDB
// bootstrapDatabase();

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
  process.env.DEV_PORT || process.env.PORT || process.getuid() || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`App is running in ${env}-mode`);
  console.log('Press CTRL-C to stop\n');
});

export default app;
