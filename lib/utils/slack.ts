import * as request from 'request';
import {
  SLACK_DEFAULT_CHANNEL,
  SLACK_DEFAULT_TOKEN,
  SLACK_RESPONSE_URL,
  SLACK_WORKSPACE
} from './constants';

export function sendResponse(response: string) {
  const url = getDefaultSlackUrl();
  const body = {
    text: response
  };

  request.post(url, { json: body });
}

function getDefaultSlackUrl() {
  return `${createSlackUrl()}/${SLACK_DEFAULT_CHANNEL}/${SLACK_DEFAULT_TOKEN}`;
}

function createSlackUrl() {
  return `${SLACK_RESPONSE_URL}/${SLACK_WORKSPACE}`;
}
