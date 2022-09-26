import * as React from 'react';
import styled from 'styled-components';
import { guid } from 'utils/data/random-number';
import { InquiryQuestion, Score } from '..';
import { SupplierSelectionList } from './SupplierSelectionList';
import { Accordion } from 'react-accessible-accordion';

const InquiryContainer = styled(Accordion)`
  display: flex;
  flex-flow: column;

  border-radius: 2px;

  [hidden] {
    display: none;
  }
`;

export interface ISuppliersInquiry {
  questions: InquiryQuestion[];
  totalScore?: Score;

  onSelectSupplier: (questionId: string, selectedOptionId: guid) => void;
  onSelectNew: (questionId: string, optionName: string) => void;
  onSelectNone: (questionId: string) => void;
  OnCalculateClicked: () => void;
}

export const SuppliersInquiry: React.FC<ISuppliersInquiry> = ({
  questions,
  onSelectSupplier,
  onSelectNew,
  onSelectNone,
}) => (
  <InquiryContainer className="suppliers-inquiry" allowMultipleExpanded={true} allowZeroExpanded={true}>
    {questions
      .sort((first: InquiryQuestion, second: InquiryQuestion) => first.order - second.order)
      .map((question: InquiryQuestion) => (
        <SupplierSelectionList
          key={question.questionId}
          question={question}
          onSelectSupplier={onSelectSupplier}
          onSelectNew={onSelectNew}
          onSelectNone={onSelectNone}
        />
      ))}
  </InquiryContainer>
);
