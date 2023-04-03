import { CalculationResultType, ISurveyCalculationResult, OptionScore, QuestionOption, SurveyQuestion } from '..';

export const calculateTotalScore = (questions: SurveyQuestion[]): ISurveyCalculationResult => {
  const selectedOptions = getSelectedOptions(questions);
  const hasEnoughSelectedOptions = selectedOptions.length >= 3;
  if (hasEnoughSelectedOptions) {
    const allOptionsHaveScore = selectedOptions.every((option) => option.score?.value);
    if (allOptionsHaveScore) {
      const totalScore = selectedOptions.reduce((total: number, option: QuestionOption) => {
        const optionScore = option.score?.value || 0;
        return total + optionScore;
      }, 0);

      return {
        type: CalculationResultType.SCORED,
        score: OptionScore.create(totalScore / selectedOptions.length),
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

const getSelectedOptions = (questions: SurveyQuestion[]): QuestionOption[] => {
  const selectedOptions = questions.reduce((options: QuestionOption[], question: SurveyQuestion) => {
    if (question.selectedOptionId) {
      if (question.newOption.optionId === question.selectedOptionId) {
        options = [...options, question.newOption];
      } else {
        const selectedOption = question.options.find(
          (option: QuestionOption) => option.optionId === question.selectedOptionId
        );
        if (selectedOption) {
          options = [...options, selectedOption];
        }
      }
    }

    return options;
  }, []);
  return selectedOptions;
};
