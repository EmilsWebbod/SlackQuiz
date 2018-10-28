import { IParameter, IValidateParam, parameter, validators } from './match';

export interface IParams {
  [key: string]: IValidateParam;
}

export function createParam(params: { param: string } & Partial<IParameter>) {
  return parameter({
    noMatch: undefined,
    validate: validators.typeOfInteger,
    ...params
  });
}

export default function getParams(parameters: IParams, text: string) {
  let queries: any = {};
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      queries[key] = parameters[key](text);
    }
  }
  return queries;
}
