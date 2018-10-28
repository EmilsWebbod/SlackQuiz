import * as qs from 'qs';
import { IRequest, IResponse } from '../interfaces/express';
import Quiz from '../utils/Quiz';
import { ISlack } from '../interfaces/slack';
import * as fetch from 'isomorphic-fetch';
import { errorResponse, startConversation } from '../utils/voice';
import getParams, { createParam, IParams } from '../utils/params';

let quiz: Quiz = new Quiz([]);

const params: IParams = {
  amount: createParam({ param: 'amount', noMatch: '10' }),
  category: createParam({ param: 'category' })
};

export function isQuizActive() {
  return quiz.started;
}

export function getActiveQuiz() {
  return quiz;
}

export async function startQuiz(req: IRequest<ISlack>, res: IResponse) {
  try {
    const queries = getParams(params, req.body.event.text);

    const queryString = qs.stringify(queries);
    const url = `https://opentdb.com/api.php?${queryString}`;
    const quizResponse = await fetch(url);
    const json = await quizResponse.json();
    quiz = new Quiz(json.results);
    quiz.startQuiz();
    req.quiz = quiz;

    return startConversation('startQuiz')(req, res);
  } catch (e) {
    console.error(e);
    return errorResponse('default')(req, res);
  }
}

export function answerQuiz(req: IRequest<ISlack>, res: IResponse) {
  try {
    const { user, text } = req.body.event;
    const correct = quiz.answer(user, text);
    if (correct) {
      if (quiz.isEndOfQuiz()) {
        return startConversation('quizEnd')(req, res);
      }
      return startConversation('correctAnswer')(req, res);
    }
  } catch (e) {
    console.error(e);
    return errorResponse('default')(req, res);
  }
}

export default quiz;
