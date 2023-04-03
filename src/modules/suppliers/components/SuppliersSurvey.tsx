import { ContentfulRichText, ISuppliersSurveyMessages, OptionScore, SurveyQuestion } from '..';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';

import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import { Accordion } from 'react-accessible-accordion';

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
  messages: ISuppliersSurveyMessages;
  questions: SurveyQuestion[];

  onSelectSupplier: (questionId: guid, selectedOptionId: guid) => void;
  onSelectNew: (questionId: guid) => void;
  onUpdateNew: (questionId: guid, optionName: string) => void;
  onSelectNone: (questionId: guid) => void;
  onCalculate: () => void;
  onToggleExpand: (questionId: guid, expanded: boolean) => void;
}

export const SuppliersSurvey: React.FC<ISuppliersSurvey> = ({
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
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} className="underline">
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2>{children}</h2>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return <h4>{children}</h4>;
      },
    },
  };
  return (
    <SurveyContainer className="suppliers-survey" allowMultipleExpanded={true} allowZeroExpanded={true}>
      <div className="survey-header">
        <h2>{title}</h2>
        <div>{renderRichText(description, options)}</div>
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
