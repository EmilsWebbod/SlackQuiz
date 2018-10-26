import * as fetch from 'isomorphic-fetch';
import * as qs from 'qs';

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
    quiz: (_: object, args: { answer: string }) => {
      if (!quiz) throw 'Quiz not started. Run "quizStart"';
      if (quiz.answer(args.answer)) {
        return {
          message: 'Correct',
          question: quiz.getQuestion()
        };
      } else {
        return {
          message: 'Fail'
        };
      }
    },
    quizEnd: () => {
      if (!quiz) throw 'Quiz not started. Run "quizStart"';
      return quiz.endQuiz();
    }
  }
};

class Quiz {
  private _index = 0;
  private _ended = false;

  constructor(private _questions: any[]) {}

  public startQuiz() {
    return {
      questionQuery: 'query {quiz {question}}',
      endQuery: 'query {quizEnd{result}}',
      question: this.getQuestion()
    };
  }

  public getQuestion() {
    if (this._index > this._questions.length) {
      return null;
    }
    return this._questions[this._index++];
  }

  public answer(answer: string) {
    return this._questions[this._index - 1].correct_answer === answer;
  }

  public endQuiz() {
    return {
      result: 'Question answered: ' + this._questions.length
    };
  }
}

export default resolvers;
