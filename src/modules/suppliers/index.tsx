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
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
    }
  | {
      status: SuppliersFormStatus.CALCULATED;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.ERROR;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
      errorMessage: string;
    };

export interface ISupplier {
  name: string;
  score?: number;
}

export interface ISupplierCategory {
  categoryId: string;
  order: number;
  header: string;
  suppliers: ISupplier[];
}

export interface ISuppliersInquiryMessages {
  entryHeader: string;
  resultHeader: string;
  countButtonText: string;
  submitButtonText: string;
}

export enum CalculationResultType {
  SCORED,
  CUSTOM_OPTIONS_SELECTED,
  NOT_ENOUGH_OPTIONS,
}

export interface IInquiryCalculationResult {
  type: CalculationResultType;
  score?: Score;
  message: string;
}

export interface ISuppliersData {
  messages: ISuppliersInquiryMessages;
  categories: ISupplierCategory[];
}

export class SuppliersInquiryData {
  public questions: InquiryQuestion[];

  public constructor(categories: ISupplierCategory[], public messages: ISuppliersInquiryMessages) {
    this.questions = categories.map((category) => {
      const question = new InquiryQuestion(category.header, category.order, category.categoryId);
      const options = category.suppliers.map((option) => new InquiryOption(option.name, Score.create(option.score)));
      question.AddOptions(options);
      return question;
    });
  }
}

export class InquiryQuestion {
  public readonly questionId: string;
  public readonly options: InquiryOption[];
  public readonly newOption: InquiryOption;
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

  public AddOptions(options: InquiryOption[]) {
    this.options.push(...options);
  }
}

export class InquiryOption {
  public readonly optionId: guid;
  constructor(public readonly text: string, public readonly score?: Score) {
    this.optionId = getGuid();
  }
}

export class Score {
  private constructor(public readonly value?: number) {}

  public static create(value: unknown): Score {
    switch (typeof value) {
      case 'number':
        return this.fromNumber(value);
      case 'string':
        return this.fromString(value);
      default:
        return new Score();
    }
  }

  public static fromNumber(value: number): Score {
    return new Score(value);
  }

  public static fromString(value: string): Score {
    const numberValue = parseInt(value);
    return new Score(numberValue);
  }

  public equals(score: Score) {
    return this.value === score.value;
  }
}
