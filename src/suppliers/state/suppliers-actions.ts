import { IInquiry } from 'suppliers';
import { IAction } from '../../state/types';

export const actionTypes = {
  LOAD_SUPPLIERS_FORM: 'SUPPLIERS_FORM:LOAD',
  SELECT_MAIN_SUPPLIER: 'SUPPLIERS_FORM:SELECT_SUPPLIER',
  SUBMIT_SUPPLIERS_FORM: 'SUPPLIERS_FORM:SUBMIT',
};

export const LoadSuppliersForm = (inquiryData: IInquiry): IAction => ({
  type: actionTypes.LOAD_SUPPLIERS_FORM,
  payload: {
    inquiryData,
  },
});

export const SelectMainSupplier = (questionId: string, selectedOptionId: string): IAction => ({
  type: actionTypes.SELECT_MAIN_SUPPLIER,
  payload: {
    questionId,
    selectedOptionId,
  },
});

export const SubmitSuppliersForm = (): IAction => ({
  type: actionTypes.SUBMIT_SUPPLIERS_FORM,
});
