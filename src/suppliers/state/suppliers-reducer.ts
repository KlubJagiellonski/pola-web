import { AnyAction, Reducer } from 'redux';
import { actionTypes } from './suppliers-actions';
import * as actions from './suppliers-actions';
import { IAction, IActionReducer } from '../../state/types';
import { InquiryQuestion } from '..';
import { assertStatus } from 'state/assert-status';

export enum SuppliersFormStatus {
  INITIAL = 'initial',
  LOADED = 'loaded',
  SUBMITTED = 'submitted',
}

export type ISuppliersState =
  | {
      status: SuppliersFormStatus.INITIAL;
    }
  | {
      status: SuppliersFormStatus.LOADED;
      questions: InquiryQuestion[];
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      questions: InquiryQuestion[];
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
    assertStatus(state, SuppliersFormStatus.LOADED);
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

  [actionTypes.SUBMIT_SUPPLIERS_FORM]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SubmitSuppliersForm>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED);
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
