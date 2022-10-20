import { AnyAction, Reducer } from 'redux';
import { ISuppliersInquiryMessages, InquiryOption, InquiryQuestion } from 'suppliers';

import { IAction, IActionReducer } from '@State/types';

import { assertStatus } from '@Utils/assert-status';

import { actionTypes } from './suppliers-actions';
import { IInquiryCalculationResult } from './suppliers-serivce';

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
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.CALCULATED;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
      resultMessage: string;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
      resultMessage: string;
      isResultDialogVisible: boolean;
    }
  | {
      status: SuppliersFormStatus.ERROR;
      messages: ISuppliersInquiryMessages;
      questions: InquiryQuestion[];
      totalScore?: IInquiryCalculationResult;
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
      messages: action.payload.inquiryData.messages,
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
      ...state,
      status: SuppliersFormStatus.LOADED,
      questions: updatedQuestions,
    };
  },

  [actionTypes.PROPOSE_NEW_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.ProposeNewSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
    const { questionId, newSupplierName } = action.payload;
    const newOption = new InquiryOption(newSupplierName);
    const updatedQuestions =
      state.status !== SuppliersFormStatus.INITIAL
        ? state.questions.map((question) =>
            question.questionId === questionId
              ? {
                  ...question,
                  options: [...question.options, newOption],
                  selectedOptionId: newOption.optionId,
                }
              : question
          )
        : undefined;
    return {
      ...state,
      status: SuppliersFormStatus.LOADED,
      questions: updatedQuestions,
    };
  },

  [actionTypes.UNSELECT_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.UnselectSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
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
      ...state,
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
        ...state,
        status: SuppliersFormStatus.CALCULATED,
        questions: [...state.questions],
        totalScore: action.payload.score,
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
