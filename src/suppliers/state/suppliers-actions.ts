import { SuppliersInquiryData } from 'suppliers';
import { guid } from 'utils/data/random-number';
import { IAction } from '../../state/types';
import { IInquiryCalculationResult } from './suppliers-dispatcher';

export const actionTypes = {
  LOAD_SUPPLIERS_FORM: 'SUPPLIERS_FORM:LOAD',
  SELECT_MAIN_SUPPLIER: 'SUPPLIERS_FORM:SELECT_SUPPLIER',
  PROPOSE_NEW_SUPPLIER: 'SUPPLIERS_FORM:PROPOSE_NEW_SUPPLIER',
  UNSELECT_SUPPLIER: 'SUPPLIERS_FORM:UNSELECT_SUPPLIER',
  SET_CALCULATION_RESULT: 'SUPPLIERS_FORM:SET_CALCULATION_RESULT',
  SUBMIT_SUPPLIERS_FORM: 'SUPPLIERS_FORM:SUBMIT',
  SHOW_RESULT_DIALOG: 'SUPPLIERS_FORM:SHOW_RESULT_DIALOG',
  HIDE_RESULT_DIALOG: 'SUPPLIERS_FORM:HIDE_RESULT_DIALOG',
};

export const LoadSuppliersForm = (inquiryData: SuppliersInquiryData): IAction => ({
  type: actionTypes.LOAD_SUPPLIERS_FORM,
  payload: {
    inquiryData,
  },
});

export const SelectMainSupplier = (questionId: string, selectedOptionId: guid): IAction => ({
  type: actionTypes.SELECT_MAIN_SUPPLIER,
  payload: {
    questionId,
    selectedOptionId,
  },
});

export const ProposeNewSupplier = (questionId: string, newSupplierName: string): IAction => ({
  type: actionTypes.PROPOSE_NEW_SUPPLIER,
  payload: {
    questionId,
    newSupplierName,
  },
});

export const UnselectSupplier = (questionId: string): IAction => ({
  type: actionTypes.UNSELECT_SUPPLIER,
  payload: {
    questionId,
  },
});

export const SetCalculationResult = (result: IInquiryCalculationResult): IAction => ({
  type: actionTypes.SET_CALCULATION_RESULT,
  payload: {
    score: result.score,
    message: result.message,
  },
});

export const SubmitSuppliersForm = (): IAction => ({
  type: actionTypes.SUBMIT_SUPPLIERS_FORM,
});

export const ShowResultDialog = (): IAction => ({
  type: actionTypes.SHOW_RESULT_DIALOG,
});

export const HideResultDialog = (): IAction => ({
  type: actionTypes.HIDE_RESULT_DIALOG,
});
