import mockData from '../config/mockData';
import * as fetch from 'isomorphic-fetch';
import * as qs from 'qs';

interface IQuiz {
  query: {
    amount?: number;
    category?: string;
    difficulty?: string;
    type?: string;
  };
}

const resolvers = {
  Query: {
    quiz: async (_: any, args: IQuiz) => {
      if (!args.query.amount) args.query.amount = 10;

      const queries = qs.stringify(args.query);
      const url = `https://opentdb.com/api.php?${queries}`;
      const quizResponse = await fetch(url);
      const json = await quizResponse.json();

      const randomQuiz =
        json.results[Math.floor(Math.random()) * json.results.length];

      return randomQuiz;
    }
  }
};

export default resolvers;
