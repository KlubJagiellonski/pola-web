import { ISurveyQuestion } from '..';

import { ContentfulRichText, EmptyRichText } from '@Utils/contentful';
import { getGuid, guid } from '@Utils/data/random-number';

export type StringifiedJSON = string;

export class SuppliersSurvey {
  public categories: SurveyQuestion[];

  public constructor(
    public title: string,
    public description: ContentfulRichText,
    public automaticCalculationMessage: ContentfulRichText,
    public manualCalculationMessage: ContentfulRichText,
    public invalidOptionsMessage: ContentfulRichText,
    categories: ISurveyQuestion[]
  ) {
    this.categories = categories.map((category) => {
      const question = new SurveyQuestion(category.title, category.order, category.categoryId);
      const options = category.options.map(
        (option) => new QuestionOption(option.name, OptionScore.create(option.score))
      );
      question.AddOptions(options);
      return question;
    });
  }

  public static Empty: SuppliersSurvey = new SuppliersSurvey(
    'Brak danych',
    EmptyRichText,
    EmptyRichText,
    EmptyRichText,
    EmptyRichText,
    []
  );
}

export class SurveyQuestion {
  public readonly questionId: string;
  public readonly options: QuestionOption[];
  public readonly newOption: QuestionOption;
  public selectedOptionId?: string;
  public expanded: boolean;

  constructor(
    public readonly text: string,
    public readonly order: number = 1,
    public readonly title: string = `question-${getGuid()}`
  ) {
    this.questionId = title;
    this.options = [];
    this.newOption = { optionId: getGuid(), text: '' };
    this.expanded = false;
  }

  public AddOptions(options: QuestionOption[]) {
    this.options.push(...options);
    return this;
  }
}

export class QuestionOption {
  public readonly optionId: guid;
  constructor(public readonly text: string, public readonly score?: OptionScore) {
    this.optionId = getGuid();
  }
}

export class OptionScore {
  private constructor(public readonly value?: number) {}

  public static create(value: unknown): OptionScore {
    switch (typeof value) {
      case 'number':
        return this.fromNumber(value);
      case 'string':
        return this.fromString(value);
      default:
        return new OptionScore();
    }
  }

  public static fromNumber(value: number): OptionScore {
    return new OptionScore(value);
  }

  public static fromString(value: string): OptionScore {
    const numberValue = parseInt(value);
    return new OptionScore(numberValue);
  }

  public equals(score: OptionScore) {
    return this.value === score.value;
  }
}
