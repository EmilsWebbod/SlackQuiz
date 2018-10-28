export interface IQuizQuestion {
  question: string;
  correct_answer: string;
  answers: string;
}

export default class Quiz {
  private _index = 0;
  public started = false;
  public ended = false;

  private answers: Array<{ handle: string; correct: number }> = [];

  constructor(private _questions: IQuizQuestion[]) {}

  public startQuiz() {
    this.started = true;
  }

  public getQuestion() {
    if (this.ended || this._index > this._questions.length) {
      return null;
    }
    console.log('Answer', this._questions[this._index].correct_answer);
    return this._questions[this._index].question;
  }

  public answer(handle: string, answer: string) {
    if (this.ended || this._questions.length === this._index) {
      this.ended = true;
      return;
    }
    const correct = this._questions[this._index].correct_answer.match(answer);
    if (correct) {
      const index = this.answers.findIndex((x) => x.handle === handle);
      if (index > -1) {
        this.answers[index].correct++;
      } else {
        this.answers.push({ handle, correct: 1 });
      }

      ++this._index;
      return true;
    }
    return false;
  }

  public isEndOfQuiz() {
    return this._questions.length === this._index;
  }

  public endQuiz() {
    this.started = false;
    return this.getHighscore();
  }

  private getHighscore() {
    const sorted = this.answers.sort((a, b) => {
      if (a.correct < b.correct) {
        return 1;
      } else if (a.correct > b.correct) {
        return -1;
      }
      return 0;
    });
    return `
        Quiz Complete!\n
        ${sorted.map((place, i) => {
          return `${this.getPlaceStr(i)}: ${place.handle} - ${place.correct}\n`;
        })}
      `;
  }

  private getPlaceStr(i: number) {
    const place = i + 1;
    switch (i) {
      case 0:
        return `${place}st`;
      case 1:
        return `${place}nd`;
      case 2:
        return `${place}rd`;
      case 3:
        return `${place}th`;
    }
  }
}
