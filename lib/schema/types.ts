import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';

const QuizTypes = gql`
  type QuizResult {
    result: String
  }

  type QuizType {
    category: String
    type: String
    difficulty: String
    question: String
    correct_answer: String
    incorrect_answers: [String]
  }

  type QuizObject {
    questionQuery: String
    endQuery: String
    question: QuizType
  }

  type QuizAnswer {
    message: String!
    question: QuizType
  }

  input QuizArgs {
    category: Int
  }

  type Query {
    quizStart(query: QuizArgs): QuizObject
    quiz(answer: String!): QuizAnswer
    quizEnd: QuizResult
  }
`;

const types = [QuizTypes];
const typeDefs = mergeTypes(types);

export default typeDefs;
