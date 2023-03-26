import { ISuppliersInquiryMessages, InquiryQuestion, Score } from '..';
import styled from 'styled-components';

import * as React from 'react';
import { Accordion } from 'react-accessible-accordion';

import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { guid } from 'utils/data/random-number';

import { SupplierSelectionList } from './SupplierSelectionList';

const InquiryContainer = styled(Accordion)`
  display: flex;
  flex-flow: column;

  border-radius: 2px;

  [hidden] {
    display: none;
  }

  .inquiry-header {
    max-width: 40rem;
  }
  .inquiry-footer {
    max-width: 40rem;
    text-align: center;
  }
`;

export interface ISuppliersInquiry {
  messages: ISuppliersInquiryMessages;
  questions: InquiryQuestion[];

  onSelectSupplier: (questionId: guid, selectedOptionId: guid) => void;
  onSelectNew: (questionId: guid) => void;
  onUpdateNew: (questionId: guid, optionName: string) => void;
  onSelectNone: (questionId: guid) => void;
  onCalculate: () => void;
  onToggleExpand: (questionId: guid, expanded: boolean) => void;
}

export const SuppliersInquiry: React.FC<ISuppliersInquiry> = ({
  messages,
  questions,
  onSelectSupplier,
  onSelectNew,
  onUpdateNew,
  onSelectNone,
  onCalculate,
  onToggleExpand,
}) => (
  <InquiryContainer className="suppliers-inquiry" allowMultipleExpanded={true} allowZeroExpanded={true}>
    <div className="inquiry-header">
      {messages.entryHeader && <h2>{messages.entryHeader}</h2>}
      <p>Wypełnij i sprawdź polskość domowego budżetu.</p>
      <p>
        Wybierz usługodawców w poszczególnych kategoriach. Każda firma została oceniona w skali od 0 do 100, według
        &nbsp;
        <a href="https://www.pola-app.pl/about/" target="__blank">
          algorytmu aplikacji Pola
        </a>
        . Twoje odpowiedzi zostaną zsumowane po wypełnieniu wszystkich pól.
      </p>
      <p>
        Administratorem danych jest Klub Jagielloński.{' '}
        <a href="https://klubjagiellonski.pl/polityka-prywatnosci-i-regulamin/" target="__blank">
          Polityka prywatności
        </a>
      </p>
    </div>
    {questions
      .sort((first: InquiryQuestion, second: InquiryQuestion) => first.order - second.order)
      .map((question: InquiryQuestion) => (
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
    <div className="inquiry-footer">
      <PrimaryButton label={messages.countButtonText || 'Przelicz'} onClick={onCalculate} />
    </div>
  </InquiryContainer>
);
