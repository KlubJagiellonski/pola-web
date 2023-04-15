import { SurveyQuestion } from '../domain/supplier-survey';
import { ISurveyActionLabels } from '../domain/supplier-survey-state';
import styled from 'styled-components';

import * as React from 'react';
import { Accordion } from 'react-accessible-accordion';

import { ContentfulRichText } from '@Utils/contentful';
import { renderStyled } from '@Utils/contentful/render-styled';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { guid } from 'utils/data/random-number';

import { SupplierSelectionList } from './SupplierSelectionList';

const SurveyContainer = styled(Accordion)`
  display: flex;
  flex-flow: column;

  border-radius: 2px;

  [hidden] {
    display: none;
  }

  .survey-header {
    max-width: 40rem;
  }
  .survey-footer {
    max-width: 40rem;
    text-align: center;
  }
`;

export interface ISuppliersSurvey {
  title: string;
  description: ContentfulRichText;
  messages: ISurveyActionLabels;
  questions: SurveyQuestion[];

  onSelectSupplier: (questionId: guid, selectedOptionId: guid) => void;
  onSelectNew: (questionId: guid) => void;
  onUpdateNew: (questionId: guid, optionName: string) => void;
  onSelectNone: (questionId: guid) => void;
  onCalculate: () => void;
  onToggleExpand: (questionId: guid, expanded: boolean) => void;
}

export const PolishSuppliers: React.FC<ISuppliersSurvey> = ({
  title,
  description,
  messages,
  questions,
  onSelectSupplier,
  onSelectNew,
  onUpdateNew,
  onSelectNone,
  onCalculate,
  onToggleExpand,
}) => {
  return (
    <SurveyContainer className="suppliers-survey" allowMultipleExpanded={true} allowZeroExpanded={true}>
      <div className="survey-header">
        <h2>{title}</h2>
        <div>{renderStyled(description)}</div>
      </div>
      {questions
        .sort((first: SurveyQuestion, second: SurveyQuestion) => first.order - second.order)
        .map((question: SurveyQuestion) => (
          <SupplierSelectionList
            key={question.questionId}
            question={question}
            onSelectSupplier={onSelectSupplier}
            onSelectNew={onSelectNew}
            onUpdateNew={onUpdateNew}
            onSelectNone={onSelectNone}
            onToggleExpand={(expanded: boolean) => onToggleExpand(question.questionId, expanded)}
          />
        ))}
      <div className="survey-footer">
        <PrimaryButton label={messages.countButtonText || 'Przelicz'} onClick={onCalculate} />
      </div>
    </SurveyContainer>
  );
};
