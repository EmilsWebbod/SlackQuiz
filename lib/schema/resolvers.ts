import Quiz from '../utils/Quiz';
import { quizEnd, quizNext, quizStart } from '../utils/quizController';

let quiz: Quiz;

const resolvers = {
  Query: {
    quizStart,
    quiz: quizNext,
    quizEnd
  }
};

export default resolvers;
