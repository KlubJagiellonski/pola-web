import { Dispatch } from 'redux';
import { IPolaState } from 'state/types';
import { SuppliersInquiryData, InquiryOption, InquiryQuestion, ISuppliersData, Score } from 'suppliers';
import { guid } from 'utils/data/random-number';
import * as actions from './suppliers-actions';
import { SuppliersFormStatus } from './suppliers-reducer';

export const suppliersDispatcher = {
  loadFormData: (data: ISuppliersData) => async (dispatch: Dispatch) => {
    const inquiry: SuppliersInquiryData = new SuppliersInquiryData(data.categories);
    await dispatch(actions.LoadSuppliersForm(inquiry));
  },

  selectMainSupplier: (questionId: string, selectedOptionId: guid) => async (dispatch: Dispatch) => {
    try {
      console.log(questionId, selectedOptionId);
      dispatch(actions.SelectMainSupplier(questionId, selectedOptionId));
    } catch (error: unknown) {
      console.error(error);
    }
  },

  proposeNewSupplier: (questionId: string, newOptionName: string) => async (dispatch: Dispatch) => {
    try {
      await dispatch(actions.ProposeNewSupplier(questionId, newOptionName));
    } catch (error: unknown) {
      console.error(error);
    }
  },

  unselectSupplier: (questionId: string) => async (dispatch: Dispatch) => {
    try {
      await dispatch(actions.UnselectSupplier(questionId));
    } catch (error: unknown) {
      console.error(error);
    }
  },

  calculateTotalScore: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { suppliers } = getState();
      const questions = suppliers.status !== SuppliersFormStatus.INITIAL ? suppliers.questions : [];
      const calculationResult = calculateTotalScore(questions);
      await dispatch(actions.SetCalculationResult(calculationResult));
    } catch (error: unknown) {
      console.error(error);
    }
  },

  submitForm: () => async (dispatch: Dispatch) => {
    try {
      await dispatch(actions.SubmitSuppliersForm());
    } catch (error: unknown) {
      console.error(error);
    }
  },

  showDialog: () => async (dispatch: Dispatch) => {
    try {
      await dispatch(actions.ShowResultDialog());
    } catch (error: unknown) {
      console.error(error);
    }
  },

  hideDialog: () => async (dispatch: Dispatch) => {
    try {
      await dispatch(actions.HideResultDialog());
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

const getSelectedOptions = (questions: InquiryQuestion[]): InquiryOption[] => {
  const selectedOptions = questions.reduce((options: InquiryOption[], question: InquiryQuestion) => {
    if (question.selectedOptionId) {
      const selectedOption = question.options.find((option) => option.optionId === question.selectedOptionId);
      if (selectedOption) {
        options = [...options, selectedOption];
      }
    }

    return options;
  }, []);
  return selectedOptions;
};

export interface IInquiryCalculationResult {
  score?: Score;
  message: string;
}

const calculateTotalScore = (questions: InquiryQuestion[]): IInquiryCalculationResult => {
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
        score: Score.create(totalScore / selectedOptions.length),
        message: 'Twój wynik został obliczony',
      };
    } else {
      return {
        message: 'Nie możemy obliczyć Twojego wyniku',
      };
    }
  } else {
    return {
      message: 'Do wyznaczenia wyniku potrzeba przynajmniej 3 zaznaczonych dostawców',
    };
  }
};
