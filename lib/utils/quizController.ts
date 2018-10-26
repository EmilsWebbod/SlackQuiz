import Quiz from './Quiz';
import * as qs from 'qs';
import * as fetch from 'isomorphic-fetch';

interface IQuiz {
  name: string;
  questions: any[];
}

interface IQuizArgs {
  query: {
    amount?: number;
    category?: string;
    difficulty?: string;
    type?: string;
  };
}

let quiz: Quiz;

export async function quizStart(_: any, args: IQuizArgs) {
  if (!args.query) args.query = {};
  if (!args.query.amount) args.query.amount = 10;

  const queries = qs.stringify(args.query);
  const url = `https://opentdb.com/api.php?${queries}`;
  const quizResponse = await fetch(url);
  const json = await quizResponse.json();

  quiz = new Quiz(json.results);

  return quiz.startQuiz();
}

export function quizNext(
  _: any,
  { handle, answer }: { handle: string; answer: string }
) {
  if (!quiz) throw 'Quiz not started. Run "quizStart"';
  if (quiz.ended) {
    return {
      message: 'Quiz Ended'
    };
  }
  return quiz.answer(handle, answer);
}

export function quizEnd() {
  if (!quiz) throw 'Quiz not started. Run "quizStart"';
  return quiz.endQuiz();
}
