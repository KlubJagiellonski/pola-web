import { IAction } from '../../state/types';

export const actionTypes = {
  LOAD_SUPPLIERS_FORM: 'SUPPLIERS_FORM:LOAD',
  SELECT_MAIN_SUPPLIER: 'SUPPLIERS_FORM:SELECT_SUPPLIER',
  SUBMIT_SUPPLIERS_FORM: 'SUPPLIERS_FORM:SUBMIT',
};

export const LoadSuppliersForm = (data: any): IAction => ({
  type: actionTypes.LOAD_SUPPLIERS_FORM,
  payload: {
    data,
  },
});

export const SelectMainSupplier = (categoryId: string, companyName: string): IAction => ({
  type: actionTypes.SELECT_MAIN_SUPPLIER,
  payload: {
    categoryId,
    companyName,
  },
});

export const SubmitSuppliersForm = (): IAction => ({
  type: actionTypes.SUBMIT_SUPPLIERS_FORM,
});
