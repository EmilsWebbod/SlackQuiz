import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

function bootstrapDatabase() {
  const userAttached = process.env.MONGO_USER
    ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
    : '';

  mongoose.connect(
    `mongodb://${userAttached}${process.env.MONGO_SERVER}/${
      process.env.MONGO_DB
    }`,
    { useNewUrlParser: true },
    (err: any) => {
      if (err) {
        console.error(
          'Could NOT connect to mongoDB. Check your environment variables for possible errors.'
        );
        process.exit();
      } else {
        console.log(`Connected successfully to db: ${process.env.MONGO_DB} `);
      }
    }
  );
}

require('../models/User');

export default bootstrapDatabase;
export { mongoose };
