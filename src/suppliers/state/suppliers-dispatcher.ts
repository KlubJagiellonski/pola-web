import { Dispatch } from 'redux';
import { IInquiry, ISuppliersData, SuppliersInquiryData } from 'suppliers';
import { IPolaState } from '../../state/types';
import * as actions from './suppliers-actions';

export const suppliersDispatcher = {
  loadFormData: (data: ISuppliersData) => async (dispatch: Dispatch) => {
    const inquiry: IInquiry = new SuppliersInquiryData(data.categories);
    await dispatch(actions.LoadSuppliersForm(inquiry));
  },

  selectMainSupplier:
    (questionId: string, selectedOptionId: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
      try {
        console.log('dispatcher', questionId, selectedOptionId);
        await dispatch(actions.SelectMainSupplier(questionId, selectedOptionId));
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
};
