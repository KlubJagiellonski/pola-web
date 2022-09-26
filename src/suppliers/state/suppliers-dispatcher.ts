import { Dispatch } from 'redux';
import { IPolaState } from 'state/types';
import { SuppliersInquiryData, ISuppliersData } from 'suppliers';
import { guid } from 'utils/data/random-number';
import * as actions from './suppliers-actions';
import { SuppliersFormStatus } from './suppliers-reducer';
import { calculateTotalScore } from './suppliers-serivce';

export const suppliersDispatcher = {
  loadFormData: (data: ISuppliersData) => async (dispatch: Dispatch) => {
    const inquiry: SuppliersInquiryData = new SuppliersInquiryData(data.categories, data.messages);
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
