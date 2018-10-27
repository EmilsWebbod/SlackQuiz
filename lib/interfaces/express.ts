import * as express from 'express';
import { IUser } from '../models/User';

export interface IRequest<T = object> extends express.Request {
  body: T;
  user: IUser;
}

export interface IResponse extends express.Response {}
