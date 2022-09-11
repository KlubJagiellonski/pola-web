import { getGuid } from 'utils/data/random-number';

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

export interface ISuppliersData {
  categories: ISupplierCategory[];
}

export interface IInquiry {
  questions: InquiryQuestion[];
  calculateTotalScore: () => number;
}

export class SuppliersInquiryData implements IInquiry {
  public questions: InquiryQuestion[];

  public constructor(categories: ISupplierCategory[]) {
    this.questions = categories.map((category) => {
      const question = new InquiryQuestion(category.header, category.order, category.categoryId);
      const options = category.suppliers.map((option) => new InquiryOption(option.name, Score.create(option.score)));
      question.AddOptions(options);
      return question;
    });
  }

  public calculateTotalScore = (): number => {
    const totalScore = this.questions.reduce((total: number, question) => {
      const selectedOption = question.options.find((option) => option.optionId === question.selectedOptionId);
      const questionValue = selectedOption?.score?.value || 0;
      return total + questionValue;
    }, 0);
    return totalScore;
  };
}

export class InquiryQuestion {
  public readonly questionId: string;
  public readonly options: InquiryOption[];
  public selectedOptionId?: string;

  constructor(
    public readonly text: string,
    public readonly order: number = 1,
    public readonly title: string = getGuid()
  ) {
    this.questionId = title;
    this.options = [];
  }

  public AddOptions(options: InquiryOption[]) {
    this.options.push(...options);
  }
}

export class InquiryOption {
  public readonly optionId: string;
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
