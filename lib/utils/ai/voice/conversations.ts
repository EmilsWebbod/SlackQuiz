import {
  IQuizConversations,
  quizConversations
} from './conversations/quizConversations';

export type IConversationList = IQuizConversations;

const conversations: IConversationList = {
  ...quizConversations
};

export default conversations;
