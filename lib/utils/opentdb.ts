import * as qs from 'qs';
import * as fetch from 'isomorphic-fetch';

export async function fetchQuiz(queries: object) {
  const queryString = qs.stringify(queries);
  const url = `https://opentdb.com/api.php?${queryString}`;
  const quizResponse = await fetch(url);
  return (await quizResponse.json()).results;
}
