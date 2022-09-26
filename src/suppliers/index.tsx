import { color, margin } from 'styles/theme';
import { getGuid, guid } from 'utils/data/random-number';

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

export class SuppliersInquiryData {
  public questions: InquiryQuestion[];

  public constructor(categories: ISupplierCategory[]) {
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
  public selectedOptionId?: string;
  public expanded: boolean;

  constructor(
    public readonly text: string,
    public readonly order: number = 1,
    public readonly title: string = getGuid()
  ) {
    this.questionId = title;
    this.options = [];
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

export const theme = {
  colors: {
    line: color.text.red,
    option: color.border.grey,
    optionHover: color.button.redLight,
    optionSelected: color.text.red,
  },
  space: {
    small: margin.small,
    normal: margin.normal,
    large: margin.big,
    checkmark: 25,
    checkmarkCenter: 9,
  },
};

export const px = (size: number): string => size + 'px';
