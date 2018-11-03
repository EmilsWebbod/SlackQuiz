import { createError } from './ai/voice';

export const join = new RegExp(/^join/i);
export const hello = new RegExp(/^hello/i);
export const help = new RegExp(/^help/i);
export const start = new RegExp(/^start/i);
export const leaderBoard = new RegExp(/^leaderboard/i);
export const stop = new RegExp(/^\.stop/i);
export const next = new RegExp(/^\.next/i);
export const quizHelp = new RegExp(/^\.help/i);
export const all = new RegExp(/./);

function isInt(value: any) {
  return (
    !isNaN(value) &&
    (function(x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
}

type IValidate = (result: string) => boolean;
export type IValidateParam = (result: string) => string;

interface IValidators {
  typeOfString: IValidate;
  typeOfInteger: IValidate;
}

export const validators: IValidators = {
  typeOfString: (result) => typeof result === 'string',
  typeOfInteger: isInt
};

export interface IParameter {
  noMatch: string;
  param: string;
  validate: IValidate;
  singleChar?: string;
}

export const parameter = ({
  noMatch,
  param,
  validate,
  singleChar = param[0]
}: IParameter) => {
  const regEx = new RegExp(`-(${singleChar}|-${param})\\s([^\\s]*)`);

  return (str: string) => {
    const result = match(str).andGetGroup(regEx, 2) || noMatch;

    if (result && !validate(result)) {
      throw createError(`${param} is not typeof ${validate.name}`);
    }

    return result;
  };
};

export function match(str: string) {
  return {
    andGetGroup: (regEx: RegExp, group = 1) => {
      const result = str.match(regEx);
      return result ? result[group] : null;
    }
  };
}
