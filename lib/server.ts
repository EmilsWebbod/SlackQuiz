import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import bootstrapDatabase from './config/db';
import handleCors from './config/cors';

const pkg = require(__dirname + '/../package.json');

dotenv.config();

// Bootstrap mongoDB
bootstrapDatabase();

const app = express();
const port = process.env.PORT || 1337;
const env = process.env.NODE_ENV || 'development';
const corsWhitelist = process.env.ALLOWED_URLS;

app.use(helmet());
app.use(cors(handleCors(corsWhitelist)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (env === 'development') {
  app.use(morgan('combined'));
}

app.get('/', (_: express.Request, res: express.Response) => {
  return res.json({
    message: 'Welcome to the courses API',
    version: pkg.version
  });
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port} in ${env}-mode`);
  console.log('Press CTRL-C to stop\n');
});

export default app;
