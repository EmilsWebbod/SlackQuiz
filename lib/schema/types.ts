import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';

const QuizTypes = gql`
  type QuizType {
    category: String
    type: String
    difficulty: String
    question: String
    correct_answer: String
    incorrect_answers: [String]
  }

  input QuizArgs {
    category: Int
  }

  type Query {
    quiz(query: QuizArgs): QuizType
  }
`;

const types = [QuizTypes];
const typeDefs = mergeTypes(types);

export default typeDefs;
