import * as express from 'express';
import { IUser } from '../models/User';
import Quiz from '../controllers/quiz/Quiz';

export interface IRequest<T = object> extends express.Request {
  body: T;
  user: IUser;
  quiz?: Quiz;
  top5?: IUser[];
  message?: string;
}

export interface IResponse extends express.Response {}
