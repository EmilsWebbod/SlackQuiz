import { IRequest } from './express';

export type IVoiceMessage = (req: IRequest) => string;
export type IConversation = (req: IRequest) => string[];
