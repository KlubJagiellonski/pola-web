import { InquiryOption, InquiryQuestion, Score } from '.';

export const getSelectedOptions = (questions: InquiryQuestion[]): InquiryOption[] => {
  const selectedOptions = questions.reduce((options: InquiryOption[], question: InquiryQuestion) => {
    if (question.selectedOptionId) {
      if (question.newOption.optionId === question.selectedOptionId) {
        options = [...options, question.newOption];
      } else {
        const selectedOption = question.options.find((option) => option.optionId === question.selectedOptionId);
        if (selectedOption) {
          options = [...options, selectedOption];
        }
      }
    }

    return options;
  }, []);
  return selectedOptions;
};

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

export const calculateTotalScore = (questions: InquiryQuestion[]): IInquiryCalculationResult => {
  const selectedOptions = getSelectedOptions(questions);
  const hasEnoughSelectedOptions = selectedOptions.length >= 3;
  if (hasEnoughSelectedOptions) {
    const allOptionsHaveScore = selectedOptions.every((option) => option.score?.value);
    if (allOptionsHaveScore) {
      const totalScore = selectedOptions.reduce((total: number, option: InquiryOption) => {
        const optionScore = option.score?.value || 0;
        return total + optionScore;
      }, 0);

      return {
        type: CalculationResultType.SCORED,
        score: Score.create(totalScore / selectedOptions.length),
        message: 'Twój wynik został obliczony',
      };
    } else {
      return {
        type: CalculationResultType.CUSTOM_OPTIONS_SELECTED,
        message: `Nie możemy obliczyć Twojego wyniku ponieważ potrzebujemy oszacować wprowadzone opcje niestandardowe. Wyślij swój formularz, a otrzymasz wynik na adres email.`,
      };
    }
  } else {
    return {
      type: CalculationResultType.NOT_ENOUGH_OPTIONS,
      message: 'Do wyznaczenia wyniku potrzeba przynajmniej 3 zaznaczonych dostawców',
    };
  }
};
