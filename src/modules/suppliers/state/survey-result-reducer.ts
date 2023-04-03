import { ISuppliersSurveyMessages, ISurveyCalculationResult } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface ISurveyResultState {
  visible: boolean;
  messages?: ISuppliersSurveyMessages;
  totalScore?: ISurveyCalculationResult;
}

const initialState: ISurveyResultState = {
  visible: false,
};

const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState,
  reducers: {
    showSurveyResults: (state: ISurveyResultState, action) => {
      state.visible = true;
      state.messages = action.payload.messages;
      state.totalScore = action.payload.totalScore;
    },
    hideSurveyResults: (state: ISurveyResultState) => {
      return initialState;
    },
  },
});

export const { showSurveyResults, hideSurveyResults } = surveyResultSlice.actions;
export default surveyResultSlice.reducer;
