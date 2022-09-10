import { Dispatch } from 'redux';
import { IPolaState } from '../../state/types';
import * as actions from './suppliers-actions';

export const suppliersDispatcher = {
  loadFormData: (data: any) => async (dispatch: Dispatch) => {
    await dispatch(actions.LoadSuppliersForm(data));
  },

  selectMainSupplier:
    (categoryId: string, optionId: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
      try {
        //const service = SuppliersService.getInstance();
        await dispatch(actions.SelectMainSupplier(categoryId, optionId));
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
