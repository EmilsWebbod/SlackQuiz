import { getRandomMessageFrom } from '../utils/getMessage';

const messages = () => [
  'I messed up!',
  'Fuck you! YOU broke me!',
  'Sorry, not in the mood atm.'
];

export default getRandomMessageFrom(messages);
