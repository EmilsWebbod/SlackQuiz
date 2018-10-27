import { IRequest } from './express';

export type IVoiceMesage = (req: IRequest) => string;
