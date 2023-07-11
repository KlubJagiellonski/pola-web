import { ISurveyCalculationResult } from '../services/suppliers-calculation-service';

import { SuppliersSurvey } from './supplier-survey';

export enum SurveyStatus {
  LOADED = 'loaded',
  CALCULATED = 'calculated',
  SUBMITTED = 'submitted',
  ERROR = 'error',
}

export interface ISurveyActionLabels {
  resultHeader: string;
  countButtonText: string;
  submitButtonText: string;
}

export type ISupplierSurveyState =
  | {
      status: SurveyStatus.LOADED;
      actionLabels: ISurveyActionLabels;
      survey: SuppliersSurvey;
    }
  | {
      status: SurveyStatus.CALCULATED;
      actionLabels: ISurveyActionLabels;
      survey: SuppliersSurvey;
      totalScore?: ISurveyCalculationResult;
    }
  | {
      status: SurveyStatus.SUBMITTED;
      actionLabels: ISurveyActionLabels;
      survey: SuppliersSurvey;
      totalScore?: ISurveyCalculationResult;
      isResultDialogVisible: boolean;
    }
  | {
      status: SurveyStatus.ERROR;
      actionLabels: ISurveyActionLabels;
      survey: SuppliersSurvey;
      totalScore?: ISurveyCalculationResult;
      errorMessage: string;
    };
