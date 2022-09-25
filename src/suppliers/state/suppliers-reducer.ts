import { AnyAction, Reducer } from 'redux';
import { actionTypes } from './suppliers-actions';
import * as actions from './suppliers-actions';
import { IAction, IActionReducer } from '../../state/types';
import { InquiryOption, InquiryQuestion, Score } from '..';
import { assertStatus } from 'state/assert-status';

export enum SuppliersFormStatus {
  INITIAL = 'initial',
  LOADED = 'loaded',
  CALCULATED = 'calculated',
  SUBMITTED = 'submitted',
  ERROR = 'error',
}

export type ISuppliersState =
  | {
      status: SuppliersFormStatus.INITIAL;
    }
  | {
      status: SuppliersFormStatus.LOADED;
      questions: InquiryQuestion[];
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.CALCULATED;
      questions: InquiryQuestion[];
      totalScore?: Score;
      resultMessage: string;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      questions: InquiryQuestion[];
      totalScore?: Score;
      resultMessage: string;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.ERROR;
      questions: InquiryQuestion[];
      totalScore?: Score;
      errorMessage: string;
    };

const initialState: ISuppliersState = { status: SuppliersFormStatus.INITIAL };

const reducers: IActionReducer<ISuppliersState> = {
  [actionTypes.LOAD_SUPPLIERS_FORM]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.LoadSuppliersForm>
  ) => {
    console.log('incoming action', action);
    assertStatus(state, SuppliersFormStatus.INITIAL);
    return {
      status: SuppliersFormStatus.LOADED,
      questions: action.payload.inquiryData.questions,
    };
  },

  [actionTypes.SELECT_MAIN_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SelectMainSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
    const { questionId, selectedOptionId } = action.payload;
    const updatedQuestions =
      state.status !== SuppliersFormStatus.INITIAL
        ? state.questions.map((question) =>
            question.questionId === questionId
              ? {
                  ...question,
                  selectedOptionId,
                }
              : question
          )
        : undefined;
    return {
      status: SuppliersFormStatus.LOADED,
      questions: updatedQuestions,
    };
  },

  [actionTypes.PROPOSE_NEW_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.ProposeNewSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED);
    const { questionId, newSupplierName } = action.payload;
    const newOption = new InquiryOption(newSupplierName);
    const updatedQuestions =
      state.status !== SuppliersFormStatus.INITIAL
        ? state.questions.map((question) =>
            question.questionId === questionId
              ? {
                  ...question,
                  options: { ...question.options, newOption },
                  selectedOptionId: newOption.optionId,
                }
              : question
          )
        : undefined;
    return {
      status: SuppliersFormStatus.LOADED,
      questions: updatedQuestions,
    };
  },

  [actionTypes.UNSELECT_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.UnselectSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED);
    const { questionId } = action.payload;
    const updatedQuestions =
      state.status !== SuppliersFormStatus.INITIAL
        ? state.questions.map((question) =>
            question.questionId === questionId
              ? {
                  ...question,
                  selectedOptionId: undefined,
                }
              : question
          )
        : undefined;
    return {
      status: SuppliersFormStatus.LOADED,
      questions: updatedQuestions,
    };
  },

  [actionTypes.SET_CALCULATION_RESULT]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SetCalculationResult>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
    if (state.status === SuppliersFormStatus.LOADED || state.status === SuppliersFormStatus.CALCULATED) {
      return {
        status: SuppliersFormStatus.CALCULATED,
        questions: [...state.questions],
        totalScore: action.payload.score,
        resultMessage: action.payload.message,
        isResultDialogVisible: true,
      };
    }

    return state;
  },

  [actionTypes.SHOW_RESULT_DIALOG]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SetCalculationResult>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
    if (state.status === SuppliersFormStatus.LOADED || state.status === SuppliersFormStatus.CALCULATED) {
      return {
        ...state,
        isResultDialogVisible: true,
      };
    }

    return state;
  },

  [actionTypes.HIDE_RESULT_DIALOG]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SetCalculationResult>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
    if (state.status === SuppliersFormStatus.LOADED || state.status === SuppliersFormStatus.CALCULATED) {
      return {
        ...state,
        isResultDialogVisible: false,
      };
    }

    return state;
  },

  [actionTypes.SUBMIT_SUPPLIERS_FORM]: (state: ISuppliersState = initialState) => {
    assertStatus(state, SuppliersFormStatus.CALCULATED);
    return {
      status: SuppliersFormStatus.SUBMITTED,
    };
  },
};

export const suppliersReducer: Reducer<ISuppliersState, AnyAction> = (
  state: ISuppliersState = initialState,
  action: IAction
) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};
