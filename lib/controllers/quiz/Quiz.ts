import { getPlaceString } from './text';
import { getRandomInt } from '../../utils/math';

type IQuizTypes = 'multiple' | 'boolean';
type IQuizDifficulties = 'easy' | 'medium' | 'hard';

export interface IQuizQuestion {
  category: string;
  type: IQuizTypes;
  difficulty: IQuizDifficulties;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default class Quiz {
  private _answers: Array<{
    handle: string;
    name: string;
    correct: number;
  }> = [];
  private _index = 0;
  private multipleChoice: string[] = [];
  private multipleAnswer = -1;

  public started = false;
  public ended = false;

  constructor(private _questions: IQuizQuestion[]) {}

  public startQuiz() {
    this.started = true;
    this._answers = [];
  }

  public getQuestion() {
    if (this.ended || this._index > this._questions.length) {
      return null;
    }
    console.log('Answer', this._questions[this._index].correct_answer);
    return this.getQuestionString();
  }

  public answer(
    handle: string,
    name: string,
    answer: string
  ): 'true' | 'false' | string {
    if (this.ended || this._questions.length === this._index) {
      this.ended = true;
      return;
    }
    if (
      this.multipleChoice.length > 0 &&
      this.multipleAnswer + 1 === Number(answer)
    ) {
      this.addCorrectAnswerToList(handle, name);
      this.nextQuestion();
      return 'true';
    }

    const correctSplit = this._questions[this._index].correct_answer.split(' ');
    const matches = new Array(correctSplit.length).fill(false);
    const answerSplit = answer.split(' ');
    for (const answerWord of answerSplit) {
      const index = correctSplit.findIndex(
        (x) => !!answerWord.match(new RegExp(x, 'i'))
      );
      if (index > -1) {
        matches[index] = true;
      }
    }

    if (matches.every((boolean) => boolean)) {
      this.addCorrectAnswerToList(handle, name);
      this.nextQuestion();
      return 'true';
    }

    if (matches.some((x) => x)) {
      return matches
        .map(
          (match, i) =>
            match
              ? correctSplit[i]
              : correctSplit[i]
                  .split('')
                  .map(() => '*')
                  .join('')
        )
        .join(' ');
    } else {
      return 'false';
    }
  }

  public nextQuestion() {
    this.multipleChoice = [];
    this.multipleAnswer = -1;
    ++this._index;
  }

  public isEndOfQuiz() {
    this.ended = this._questions.length === this._index;
    return this.ended;
  }

  public endQuiz() {
    this.started = false;
    this.sortAnswers();
    return this.getHighscore();
  }

  public getAnswers() {
    return this._answers;
  }

  public getHighscore() {
    return `
        Quiz Complete!\n
        ${this._answers.map((answer, i) => {
          return `${getPlaceString(i)}: ${answer.name} - ${answer.correct}\n`;
        })}
      `;
  }

  public getMultipleChoice(
    question: IQuizQuestion = this._questions[this._index]
  ) {
    this.multipleChoice = question.incorrect_answers;
    this.multipleAnswer = getRandomInt(0, this.multipleChoice.length);

    this.multipleChoice.splice(this.multipleAnswer, 0, question.correct_answer);

    return `${this.multipleChoice.map((answer, i) => `${i + 1}: ${answer}\n`)}`;
  }

  private getQuestionString() {
    const question = this._questions[this._index];

    switch (question.type) {
      case 'multiple':
        const whichOfThe = question.question.match(/(\bwhich\b.*of\b.*the)/i);
        if (whichOfThe) {
          return `${question.question}\n${this.getMultipleChoice(question)}`;
        }
        return question.question;
      case 'boolean':
        return `${question.question}\nTrue or False?`;
    }
  }

  private addCorrectAnswerToList(handle: string, name: string) {
    const index = this._answers.findIndex((x) => x.handle === handle);
    if (index > -1) {
      this._answers[index].correct++;
    } else {
      this._answers.push({ handle, name, correct: 1 });
    }
  }

  private sortAnswers() {
    this._answers = this._answers.sort((a, b) => {
      if (a.correct < b.correct) {
        return 1;
      } else if (a.correct > b.correct) {
        return -1;
      }
      return 0;
    });
  }
}
