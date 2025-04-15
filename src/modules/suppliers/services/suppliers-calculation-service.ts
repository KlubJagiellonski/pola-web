import { QuestionOption, SurveyQuestion } from '../domain/supplier-survey';

import { ContentfulRichText } from '@Utils/contentful';
import { InvalidOperationException } from '@Utils/error-handling/errors';

export type CalculationResultType = 'scored' | 'custom-option' | 'not-enough';

export interface ICalculationResult {
  type: CalculationResultType;
  score?: number;
}

export interface ISurveyCalculationResult {
  type: CalculationResultType;
  score?: number;
  message: ContentfulRichText | string;
}

export const calculateSuppliersSurvey = (questions: SurveyQuestion[]): ICalculationResult => {
  const selectedOptions = filterSelectedOptions(questions);

  const hasEnoughOptions = selectedOptions.length >= 3;
  if (!hasEnoughOptions) {
    return {
      type: 'not-enough',
    };
  }

  const allOptionsHaveScore = selectedOptions.every((option) => option.score?.value);
  if (!allOptionsHaveScore) {
    return {
      type: 'custom-option',
    };
  }

  const totalScore = calc(selectedOptions);

  return {
    type: 'scored',
    score: totalScore / selectedOptions.length,
  };
};

function filterSelectedOptions(questions: SurveyQuestion[]): QuestionOption[] {
  const selectedOptions = questions.reduce((options: QuestionOption[], question: SurveyQuestion) => {
    if (!question.selectedOptionId) {
      return options;
    }

    const isUnknownOptionSelected = question.newOption.optionId === question.selectedOptionId;
    if (isUnknownOptionSelected) {
      options = [...options, question.newOption];
      return options;
    }

    const selectedOption = question.options.find(
      (option: QuestionOption) => option.optionId === question.selectedOptionId
    );

    if (!selectedOption) {
      throw new InvalidOperationException(
        `Selected option with ID '${question.selectedOptionId}' is not present in the survey question!`
      );
    }

    options = [...options, selectedOption];
    return options;
  }, []);
  return selectedOptions;
}

function calc(questionOptions: QuestionOption[]): number {
  const totalScore = questionOptions.reduce((total: number, option: QuestionOption) => {
    const optionScore = option.score?.value || 0;
    return total + optionScore;
  }, 0);

  return totalScore;
}
