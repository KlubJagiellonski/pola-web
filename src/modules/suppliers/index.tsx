import { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text';

import { getGuid, guid } from 'utils/data/random-number';

export enum SuppliersFormStatus {
  LOADED = 'loaded',
  CALCULATED = 'calculated',
  SUBMITTED = 'submitted',
  ERROR = 'error',
}

export type ISuppliersState =
  | {
      status: SuppliersFormStatus.LOADED;
      messages: ISuppliersSurveyMessages;
      questions: SurveyQuestion[];
    }
  | {
      status: SuppliersFormStatus.CALCULATED;
      messages: ISuppliersSurveyMessages;
      questions: SurveyQuestion[];
      totalScore?: ISurveyCalculationResult;
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      messages: ISuppliersSurveyMessages;
      questions: SurveyQuestion[];
      totalScore?: ISurveyCalculationResult;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.ERROR;
      messages: ISuppliersSurveyMessages;
      questions: SurveyQuestion[];
      totalScore?: ISurveyCalculationResult;
      errorMessage: string;
    };

export interface ISurveyOption {
  name: string;
  score?: number;
}

export interface ISurveyQuestion {
  categoryId: string;
  order: number;
  title: string;
  options: ISurveyOption[];
}

export type ContentfulRichText = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export interface ISuppliersSurveyMessages {
  entryHeader: string;
  resultHeader: string;
  countButtonText: string;
  submitButtonText: string;
  automaticCalculationMessage: ContentfulRichText;
  manualCalculationMessage: ContentfulRichText;
  invalidOptionsMessage: ContentfulRichText;
}

export enum CalculationResultType {
  SCORED,
  CUSTOM_OPTIONS_SELECTED,
  NOT_ENOUGH_OPTIONS,
}

export interface ISurveyCalculationResult {
  type: CalculationResultType;
  score?: OptionScore;
  message: string;
}

export interface ISuppliersData {
  messages: ISuppliersSurveyMessages;
  categories: ISurveyQuestion[];
}

export class SuppliersSurveyData {
  public questions: SurveyQuestion[];

  public constructor(categories: ISurveyQuestion[]) {
    this.questions = categories.map((category) => {
      const question = new SurveyQuestion(category.title, category.order, category.categoryId);
      const options = category.options.map(
        (option) => new QuestionOption(option.name, OptionScore.create(option.score))
      );
      question.AddOptions(options);
      return question;
    });
  }
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
