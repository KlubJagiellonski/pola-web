import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { guid } from 'utils/data/random-number';
import { InquiryOption, InquiryQuestion, theme, px } from '..';
import { color, fontSize } from '../../styles/theme';
import { InquiryListOption } from './InquiryListOption';

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const InquiryQuestionContainer = styled(AccordionItem)`
  border-left: ${theme.space.small} solid ${theme.colors.line};
  padding-left: ${theme.space.normal};
  margin-bottom: ${theme.space.normal};
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
  margin: ${theme.space.normal};
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
  question: InquiryQuestion;

  onSelectSupplier: (questionId: string, selectedOptionId: guid) => void;
  onSelectNew: (questionId: string, optionName: string) => void;
  onSelectNone: (questionId: string) => void;
}

export const SupplierSelectionList: React.FC<ISupplierSelectionList> = (props: ISupplierSelectionList) => {
  const { question, onSelectSupplier, onSelectNew, onSelectNone } = props;
  const [newSupplierName, setNewSupplierName] = React.useState<string>('');

  const handleNewSupplierName = (e: React.FormEvent<HTMLInputElement>) => {
    setNewSupplierName(e.currentTarget.value);
  };

  return (
    <InquiryQuestionContainer className="suppliers-category">
      <AccordionItemHeading>
        <ItemButton>
          <h3 className="question-header">{question.text}</h3>
        </ItemButton>
      </AccordionItemHeading>
      <ItemPanel>
        <InquiryOptionsList>
          {question.options.sort(sortOptions).map((option: InquiryOption) => (
            <ListElement key={option.optionId}>
              <InquiryListOption
                name={option.text}
                score={option?.score?.value}
                groupName={question.questionId}
                onSelect={() => onSelectSupplier(question.questionId, option.optionId)}
              />
            </ListElement>
          ))}

          <ListElement>
            <InquiryListOption
              name="Inny"
              groupName={question.questionId}
              onSelect={() => onSelectNew(question.questionId, newSupplierName)}
            />
            <input
              className="new-supplier"
              type="text"
              name={question.questionId}
              placeholder="nazwa Twojego dostawcy"
              value={newSupplierName}
              onChange={handleNewSupplierName}
            />
          </ListElement>
          <ListElement>
            <InquiryListOption
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

const sortOptions = (first: InquiryOption, second: InquiryOption) => {
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
