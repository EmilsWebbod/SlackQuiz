import Quiz from '../utils/Quiz';
import { quizEnd, quizNext, quizStart, slack } from '../utils/quizController';

let quiz: Quiz;

const resolvers = {
  Query: {
    quizStart,
    quiz: quizNext,
    quizEnd,
    slack
  }
};

export default resolvers;
