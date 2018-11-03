import { IRequest, IResponse } from '../interfaces/express';
import Quiz from './quiz/Quiz';
import { ISlack } from '../interfaces/slack';
import { errorResponse, response, startConversation } from '../utils/ai/voice';
import getParams, { params } from '../utils/params';
import User from '../models/User';
import { fetchQuiz } from '../utils/opentdb';

let quiz: Quiz = new Quiz([]);

export function isQuizActive() {
  return quiz.started;
}

export function getActiveQuiz() {
  return quiz;
}

export async function startQuiz(req: IRequest<ISlack>, res: IResponse) {
  try {
    const queries = getParams(params, req.body.event.text);
    const quizResult = await fetchQuiz(queries);
    quiz = new Quiz(quizResult);

    quiz.startQuiz();
    req.quiz = quiz;

    return startConversation('startQuiz')(req, res);
  } catch (e) {
    console.error(e);
    return errorResponse('default')(req, res);
  }
}

export async function answerQuiz(req: IRequest<ISlack>, res: IResponse) {
  try {
    const { text } = req.body.event;
    const user = req.user;
    const correct = quiz.answer(user.user, user.name, text);

    if (correct === 'true') {
      if (quiz.isEndOfQuiz()) {
        return await endQuiz(req, res);
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

export async function nextQuestion(req: IRequest<ISlack>, res: IResponse) {
  try {
    quiz.nextQuestion();
    if (quiz.isEndOfQuiz()) {
      return await endQuiz(req, res);
    }
    return response('quizSendQuestion')(req, res);
  } catch (e) {
    return errorResponse()(req, res);
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

export async function stopQuiz(req: IRequest<ISlack>, res: IResponse) {
  try {
    if (!quiz.started || quiz.ended) {
      return response('quizAlreadyEnded')(req, res);
    }
    return await endQuiz(req, res);
  } catch (e) {
    return errorResponse()(req, res);
  }
}

async function endQuiz(req: IRequest<ISlack>, res: IResponse) {
  quiz.endQuiz();
  saveQuizScoreToDB(req, res).then();
  req.quiz = quiz;
  return await startConversation('quizEnd')(req, res);
}

export default quiz;
