import { IInquiryCalculationResult, ISuppliersInquiryMessages } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface IInquiryResultState {
  visible: boolean;
  messages?: ISuppliersInquiryMessages;
  totalScore?: IInquiryCalculationResult;
}

const initialState: IInquiryResultState = {
  visible: false,
};

const inquiryResultSlice = createSlice({
  name: 'inquiryResult',
  initialState,
  reducers: {
    showInquiryResults: (state: IInquiryResultState, action) => {
      state.visible = true;
      state.messages = action.payload.messages;
      state.totalScore = action.payload.totalScore;
    },
    hideInquiryResults: (state: IInquiryResultState) => {
      return initialState;
    },
  },
});

export const { showInquiryResults, hideInquiryResults } = inquiryResultSlice.actions;
export default inquiryResultSlice.reducer;
