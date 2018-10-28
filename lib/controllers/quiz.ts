import * as qs from 'qs';
import { IRequest, IResponse } from '../interfaces/express';
import Quiz from '../utils/Quiz';
import { ISlack } from '../interfaces/slack';
import * as fetch from 'isomorphic-fetch';
import { errorResponse, response, startConversation } from '../utils/voice';
import getParams, { createParam, IParams } from '../utils/params';
import User from '../models/User';
import { validators } from '../utils/match';

let quiz: Quiz = new Quiz([]);

const params: IParams = {
  amount: createParam({ param: 'amount', noMatch: '10' }),
  category: createParam({ param: 'category' }),
  type: createParam({ param: 'type', validate: validators.typeOfString })
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
    console.log(json.results);
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
    const { text } = req.body.event;
    const user = req.user;
    const correct = quiz.answer(user.user, user.name, text);
    if (correct === 'true') {
      if (quiz.isEndOfQuiz()) {
        quiz.endQuiz();
        saveQuizScoreToDB(req, res).then();
        return startConversation('quizEnd')(req, res);
      }
      return startConversation('correctAnswer')(req, res);
    }
    if (correct !== 'false') {
      req.message = correct;
      return response('quizAlmostCorrect')(req, res);
    }
  } catch (e) {
    console.error(e);
    return errorResponse('default')(req, res);
  }
}

export async function getLeaderBoard(req: IRequest<ISlack>, res: IResponse) {
  try {
    req.top5 = await User.getTop5();
    return response('top5')(req, res);
  } catch (e) {
    console.error(e);
    return errorResponse()(req, res);
  }
}

async function saveQuizScoreToDB(req: IRequest<ISlack>, res: IResponse) {
  const answers = quiz.getAnswers();
  await Promise.all(
    answers.map((user) => User.addUserScore(user.handle, user.correct))
  );
}

export default quiz;
