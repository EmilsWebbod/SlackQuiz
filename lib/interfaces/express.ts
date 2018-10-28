import * as express from 'express';
import { IUser } from '../models/User';
import Quiz from '../utils/Quiz';

export interface IRequest<T = object> extends express.Request {
  body: T;
  user: IUser;
  quiz?: Quiz;
}

export interface IResponse extends express.Response {}
