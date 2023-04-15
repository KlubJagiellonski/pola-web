import { SurveyQuestion } from '../domain/supplier-survey';
import { ISupplierSurveyState, SurveyStatus } from '../domain/supplier-survey-state';

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
  state: ISupplierSurveyState,
  actionHandler: () => ISupplierSurveyState | undefined
): ISupplierSurveyState => {
  try {
    const newState = actionHandler();
    newState ? console.log(`state updated`, newState) : console.warn(`cannot update state`);
    return newState || state;
  } catch (error: unknown) {
    console.error(error);
    const updatedSurvey = state.survey;
    updatedSurvey.categories = { ...state.survey.categories };
    return {
      status: SurveyStatus.ERROR,
      survey: updatedSurvey,
      actionLabels: { ...state.actionLabels },
      errorMessage: error instanceof Error ? error.message : 'unexpected error',
    };
  }
};

/**
 * Internal Survey component reducer responsible for managing supplier survey state.
 * It is separated from other application reducers to decouple survey logic from Pola app logic.
 * @param state actual survey state, in particular selected options for questions
 * @param action operation on the survey
 * @returns new survey state
 */
export const suppliersReducer = (
  state: ISupplierSurveyState,
  action: IAction<SupplierAction>
): ISupplierSurveyState => {
  switch (action.type) {
    case 'selectMain':
      return applyStateChange(state, () => {
        assertStatus(state, SurveyStatus.LOADED, SurveyStatus.CALCULATED);
        const { questionId, selectedOptionId } = action.payload;
        const updatedQuestions = state.survey.categories.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SurveyStatus.LOADED,
          survey: {
            ...state.survey,
            categories: updatedQuestions,
          },
        };
      });

    case 'proposeNewSupplier':
      return applyStateChange(state, () => {
        assertStatus(state, SurveyStatus.LOADED, SurveyStatus.CALCULATED);
        const { questionId } = action.payload;
        const updatedQuestions = state.survey.categories.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId: question.newOption.optionId,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SurveyStatus.LOADED,
          survey: {
            ...state.survey,
            categories: updatedQuestions,
          },
          actionLabels: { ...state.actionLabels },
        };
      });

    case 'updateSupplierName':
      return applyStateChange(state, () => {
        assertStatus(state, SurveyStatus.LOADED, SurveyStatus.CALCULATED);
        const { questionId, newSupplierName } = action.payload;
        const updatedQuestions = state.survey.categories.map((question) =>
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
          status: SurveyStatus.LOADED,
          survey: {
            ...state.survey,
            categories: updatedQuestions,
          },
          actionLabels: { ...state.actionLabels },
        };
      });

    case 'unselect':
      return applyStateChange(state, () => {
        assertStatus(state, SurveyStatus.LOADED, SurveyStatus.CALCULATED);
        const { questionId } = action.payload;
        const updatedQuestions = state.survey.categories.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                selectedOptionId: undefined,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          status: SurveyStatus.LOADED,
          survey: {
            ...state.survey,
            categories: updatedQuestions,
          },
        };
      });

    case 'calculate':
      return applyStateChange(state, () => {
        assertStatus(state, SurveyStatus.LOADED, SurveyStatus.CALCULATED);

        return {
          status: SurveyStatus.CALCULATED,
          survey: {
            ...state.survey,
            categories: [...state.survey.categories],
          },
          actionLabels: { ...state.actionLabels },
          totalScore: action.payload,
        };
      });

    case 'toggleExpand':
      return applyStateChange(state, () => {
        const { questionId, expanded } = action.payload;
        const updatedQuestions = state.survey.categories.map((question) =>
          question.questionId === questionId
            ? ({
                ...question,
                expanded,
              } as SurveyQuestion)
            : question
        );
        return {
          ...state,
          survey: {
            ...state.survey,
            categories: updatedQuestions,
          },
        };
      });

    default:
      return state;
  }
};
