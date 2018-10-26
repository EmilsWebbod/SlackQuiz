import * as fetch from 'isomorphic-fetch';
import * as qs from 'qs';
import Quiz from '../utils/Quiz';

let quiz: Quiz;

interface IQuiz {
  name: string;
  questions: any[];
}

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
    quizStart: async (_: any, args: IQuiz) => {
      if (!args.query) args.query = {};
      if (!args.query.amount) args.query.amount = 10;

      const queries = qs.stringify(args.query);
      const url = `https://opentdb.com/api.php?${queries}`;
      const quizResponse = await fetch(url);
      const json = await quizResponse.json();

      quiz = new Quiz(json.results);

      return quiz.startQuiz();
    },
    quiz: (
      _: object,
      { handle, answer }: { handle: string; answer: string }
    ) => {
      if (!quiz) throw 'Quiz not started. Run "quizStart"';
      if (quiz.ended) {
        return {
          message: 'Quiz Ended'
        };
      }
      return quiz.answer(handle, answer);
    },
    quizEnd: () => {
      if (!quiz) throw 'Quiz not started. Run "quizStart"';
      return quiz.endQuiz();
    }
  }
};

export default resolvers;
