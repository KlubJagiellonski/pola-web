import { OptionScore, QuestionOption, SurveyQuestion } from '../domain/supplier-survey';

import { getGuid } from '@Utils/data/random-number';

export class QuestionBuilder {
  private _instance: SurveyQuestion = new SurveyQuestion('test text', 1, getGuid());
  public constructor(id: string, text: string) {
    this._instance = new SurveyQuestion(text, 1, id).AddOptions([{ optionId: getGuid(), text: 'Inny' }]);
  }
  public withOptions(options: { text: string; score: number }[]): QuestionBuilder {
    this._instance.AddOptions(options.map((o) => new QuestionOption(o.text, OptionScore.create(o.score))));
    return this;
  }
  public withSelected(optionText: string): QuestionBuilder {
    const optionId = this._instance.options.find((o) => o.text === optionText)?.optionId;
    this._instance.selectedOptionId = optionId;
    return this;
  }
  public withNewOptionSelected(): QuestionBuilder {
    const optionId = this._instance.options.find((o) => o.text === 'Inny')?.optionId;
    this._instance.selectedOptionId = optionId;
    return this;
  }
  public build(): SurveyQuestion {
    return this._instance;
  }
}
