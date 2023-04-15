import { ISurveyActionLabels } from '../domain/supplier-survey-state';
import { ISurveyCalculationResult } from '../services/suppliers-calculation-service';
import { createSlice } from '@reduxjs/toolkit';

export interface ISurveyResultState {
  visible: boolean;
  actionLabels?: ISurveyActionLabels;
  totalScore?: ISurveyCalculationResult;
}

const initialState: ISurveyResultState = {
  visible: false,
};

/**
 * Suppliers survey state required for survey calculation modal functionality
 */
const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState,
  reducers: {
    showSurveyResults: (state: ISurveyResultState, action) => {
      state.visible = true;
      state.actionLabels = action.payload.actionLabels;
      state.totalScore = action.payload.totalScore;
    },
    hideSurveyResults: (state: ISurveyResultState) => {
      return initialState;
    },
  },
});

export const { showSurveyResults, hideSurveyResults } = surveyResultSlice.actions;
export default surveyResultSlice.reducer;
