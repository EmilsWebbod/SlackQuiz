import { IConversation } from '../../../../interfaces/voice';
import { startConversationFrom } from '../utils/getMessage';
import confirmMessages from '../messages/success/confirmMessages';

export interface IQuizConversations {
  startQuiz: IConversation;
  correctAnswer: IConversation;
  quizEnd: IConversation;
}

export const quizConversations: IQuizConversations = {
  startQuiz: startConversationFrom((req) => {
    const question = req.quiz.getQuestion();

    return [
      confirmMessages(req),
      'Quiz will now start after 1 second!',
      question
    ];
  }),
  correctAnswer: startConversationFrom((req) => {
    const question = req.quiz.getQuestion();

    return [question];
  }),
  quizEnd: startConversationFrom((req) => {
    return ['End of QUIZ', req.quiz.getHighscore()];
  })
};
