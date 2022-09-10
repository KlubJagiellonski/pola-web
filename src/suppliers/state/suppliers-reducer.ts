import { AnyAction, Reducer } from 'redux';
import { actionTypes } from './suppliers-actions';
import * as actions from './suppliers-actions';
import { IAction, IActionReducer } from '../../state/types';
import { IFormQuestion } from '..';
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
      questions: IFormQuestion[];
    }
  | {
      status: SuppliersFormStatus.SUBMITTED;
      questions: IFormQuestion[];
    };

const initialState: ISuppliersState = { status: SuppliersFormStatus.INITIAL };

const reducers: IActionReducer<ISuppliersState> = {
  [actionTypes.LOAD_SUPPLIERS_FORM]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.LoadSuppliersForm>
  ) => {
    assertStatus(state, SuppliersFormStatus.INITIAL);
    return {
      status: SuppliersFormStatus.LOADED,
      categories: action.payload.data,
    };
  },

  [actionTypes.SELECT_MAIN_SUPPLIER]: (
    state: ISuppliersState = initialState,
    action: ReturnType<typeof actions.SelectMainSupplier>
  ) => {
    assertStatus(state, SuppliersFormStatus.LOADED);
    return {
      status: SuppliersFormStatus.LOADED,
      categories:
        state.status === SuppliersFormStatus.LOADED
          ? state.questions.map((question) =>
              question.questionId === action.payload.categoryId
                ? {
                    ...question,
                    selectOptionId: action.payload.companyName,
                  }
                : question
            )
          : undefined,
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

export const newsletterReducer: Reducer<ISuppliersState, AnyAction> = (
  state: ISuppliersState = initialState,
  action: IAction
) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};
