import * as express from 'express';

export interface IRequest<T = object> extends express.Request {
  body: T;
}

export interface IResponse extends express.Response {}
