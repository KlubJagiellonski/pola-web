import { QuestionOption, SurveyQuestion } from '..';
import { pgeTheme } from '../styles/inquiry-theme';
import debounce from 'lodash.debounce';
import styled, { keyframes } from 'styled-components';
import { color, fontSize } from 'styles/theme';

import * as React from 'react';
import { useRef, useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { guid } from 'utils/data/random-number';

import { SurveyListOption } from './SurveyListOption';

const InquiryQuestionContainer = styled(AccordionItem)`
  border-left: ${pgeTheme.space.small} solid ${pgeTheme.colors.line};
  padding-left: ${pgeTheme.space.normal};
  margin-bottom: ${pgeTheme.space.normal};
`;

const ItemButton = styled(AccordionItemButton)`
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;

  .question-header {
    margin: 1em 0;
    user-select: none;
  }
`;

const fadein = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const ItemPanel = styled(AccordionItemPanel)`
  font-size: ${fontSize.small};
  animation: ${fadein} 1s ease-in;
`;

const InquiryOptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 30em;
  margin-bottom: 1rem;
  font-size: ${fontSize.normal};
`;

const ListElement = styled.li`
  margin: ${pgeTheme.space.normal};
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5em;

  :last-of-type {
    margin-bottom: 0;
  }

  input.new-supplier {
    width: 20em;
    font-size: 1rem;
    padding: 0 1em;
    border: 1px solid ${color.border.white};
    &::hover,
    &:focus,
    &:active {
      border: 1px solid ${color.border.grey};
    }
  }
`;

export interface ISupplierSelectionList {
  question: SurveyQuestion;

  onSelectSupplier: (questionId: string, selectedOptionId: guid) => void;
  onSelectNew: (questionId: string) => void;
  onUpdateNew: (questionId: string, optionName: string) => void;
  onSelectNone: (questionId: string) => void;
  onToggleExpand: (expanded: boolean) => void;
}

export const SupplierSelectionList: React.FC<ISupplierSelectionList> = (props: ISupplierSelectionList) => {
  const { question, onSelectSupplier, onSelectNew, onSelectNone, onToggleExpand } = props;
  const [newOption, updateNewOption] = useState('');

  const handleHeaderClick = () => {
    onToggleExpand(!question.expanded);
  };

  const debounceUpdateState = useRef(
    debounce(
      (payload: any) => {
        props.onUpdateNew(payload.id, payload.value);
      },
      500,
      { leading: false, trailing: true }
    )
  ).current;

  React.useEffect(() => {
    return () => {
      debounceUpdateState.cancel();
    };
  }, [debounceUpdateState]);

  return (
    <InquiryQuestionContainer className="suppliers-category">
      <AccordionItemHeading onClick={handleHeaderClick}>
        <ItemButton>
          <h3 className="question-header">{question.text}</h3>
        </ItemButton>
      </AccordionItemHeading>
      <ItemPanel>
        <InquiryOptionsList>
          {question.options.sort(sortOptions).map((option: QuestionOption) => (
            <ListElement key={option.optionId}>
              <SurveyListOption
                name={option.text}
                score={option?.score?.value}
                groupName={question.questionId}
                onSelect={() => onSelectSupplier(question.questionId, option.optionId)}
              />
            </ListElement>
          ))}

          <ListElement>
            <SurveyListOption
              name="Inny"
              groupName={question.questionId}
              onSelect={() => onSelectNew(question.questionId)}
            />
            <input
              className="new-supplier"
              type="text"
              name={question.questionId}
              placeholder="nazwa Twojego dostawcy"
              value={newOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                updateNewOption(value);
                debounceUpdateState({ id: question.questionId, value });
              }}
            />
          </ListElement>
          <ListElement>
            <SurveyListOption
              name="Brak"
              groupName={question.questionId}
              onSelect={() => onSelectNone(question.questionId)}
            />
          </ListElement>
        </InquiryOptionsList>
      </ItemPanel>
    </InquiryQuestionContainer>
  );
};

const sortOptions = (first: QuestionOption, second: QuestionOption) => {
  if (!first.score?.value && !second.score?.value) {
    return 0;
  }
  if (!first.score?.value) {
    return -1;
  }
  if (!second.score?.value) {
    return 1;
  }

  return second.score.value - first.score.value;
};
