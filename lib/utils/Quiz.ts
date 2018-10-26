export default class Quiz {
  private _index = 0;
  public ended = false;

  private answers: Array<{ handle: string; correct: number }> = [];

  constructor(private _questions: any[]) {}

  public startQuiz() {
    return {
      questionQuery: 'query {quiz {question}}',
      endQuery: 'query {quizEnd{result}}',
      question: this.getQuestion()
    };
  }

  public getQuestion() {
    if (this.ended || this._index > this._questions.length) {
      return null;
    }
    return this._questions[this._index++];
  }

  public answer(handle: string, answer: string) {
    if (this._questions.length === this._index) {
      this.ended = true;
    }
    const correct = this._questions[this._index - 1].correct_answer === answer;
    if (correct) {
      const index = this.answers.findIndex((x) => x.handle === handle);
      if (index > -1) {
        this.answers[index].correct++;
      } else {
        this.answers.push({ handle, correct: 1 });
      }
      return {
        message: 'Correct',
        question: this.getQuestion()
      };
    }
    return {
      message: 'Fail'
    };
  }

  public endQuiz() {
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
    return {
      result: `
        Quiz Complete!\n
        ${sorted.map((place, i) => {
          return `${this.getPlaceStr(i)}: ${place.handle} - ${place.correct}\n`;
        })}
      `
    };
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
