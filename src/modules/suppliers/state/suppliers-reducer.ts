import { ISuppliersState, QuestionOption, SuppliersFormStatus, SurveyQuestion } from '..';

import { assertStatus } from 'utils/assert-status';

export type SupplierAction =
  | 'loadData'
  | 'selectMain'
  | 'proposeNewSupplier'
  | 'updateSupplierName'
  | 'toggleExpand'
  | 'unselect'
  | 'calculate'
  | 'submit';
export interface IAction<T extends string> {
  type: T;
  payload: any;
}

const applyStateChange = (
  state: ISuppliersState,
  actionHandler: () => ISuppliersState | undefined
): ISuppliersState => {
  try {
    const newState = actionHandler();
    newState ? console.log(`state updated`, newState) : console.warn(`cannot update state`);
    return newState || state;
  } catch (error: unknown) {
    console.error(error);
    return {
      status: SuppliersFormStatus.ERROR,
      questions: { ...state.questions },
      messages: { ...state.messages },
      errorMessage: error instanceof Error ? error.message : 'unexpected error',
    };
  }
};

export const suppliersReducer = (state: ISuppliersState, action: IAction<SupplierAction>): ISuppliersState => {
  switch (action.type) {
    case 'selectMain':
      return applyStateChange(state, () => {
        assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
        const { questionId, selectedOptionId } = action.payload;
        const updatedQuestions = state.questions.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SuppliersFormStatus.LOADED,
          questions: updatedQuestions,
        };
      });

    case 'proposeNewSupplier':
      return applyStateChange(state, () => {
        assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
        const { questionId } = action.payload;
        const updatedQuestions = state.questions.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId: question.newOption.optionId,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SuppliersFormStatus.LOADED,
          questions: updatedQuestions,
          messages: { ...state.messages },
        };
      });

    case 'updateSupplierName':
      return applyStateChange(state, () => {
        assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
        const { questionId, newSupplierName } = action.payload;
        const updatedQuestions = state.questions.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                newOption: {
                  ...question.newOption,
                  text: newSupplierName || '',
                },
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SuppliersFormStatus.LOADED,
          questions: updatedQuestions,
          messages: { ...state.messages },
        };
      });

    case 'unselect':
      return applyStateChange(state, () => {
        assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);
        const { questionId } = action.payload;
        const updatedQuestions = state.questions.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId: undefined,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SuppliersFormStatus.LOADED,
          questions: updatedQuestions,
        };
      });

    case 'calculate':
      return applyStateChange(state, () => {
        assertStatus(state, SuppliersFormStatus.LOADED, SuppliersFormStatus.CALCULATED);

        return {
          status: SuppliersFormStatus.CALCULATED,
          questions: [...state.questions],
          messages: { ...state.messages },
          totalScore: action.payload,
        };
      });

    case 'toggleExpand':
      return applyStateChange(state, () => {
        const { questionId, expanded } = action.payload;
        const updatedQuestions = state.questions.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                expanded,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          questions: updatedQuestions,
        };
      });

    default:
      return state;
  }
};
