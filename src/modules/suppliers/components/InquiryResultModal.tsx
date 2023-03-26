import { CalculationResultType, ISuppliersInquiryMessages, Score } from '..';
import { IInquiryCalculationResult } from '../suppliers-service';
import styled from 'styled-components';

import * as React from 'react';
import { useState } from 'react';

import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { FormInput } from 'components/form-input';
import { Modal } from 'layout/modal/Modal';

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-content: center;
  justify-content: center;
  padding-top: 1rem;
  gap: 1rem;
  padding: 0 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  gap: 1rem;
`;

export interface IInquiryResultModal {
  messages: ISuppliersInquiryMessages;
  totalScore?: IInquiryCalculationResult;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalContent = (
  totalScore: IInquiryCalculationResult,
  messages: ISuppliersInquiryMessages,
  onSubmit: () => void
): JSX.Element => {
  const { type, score, message } = totalScore;
  const [email, setEmail] = useState('');

  switch (type) {
    case CalculationResultType.SCORED:
      return <Content className="scored-content">{score?.value && <h2>{score.value.toFixed(2)} punktów</h2>}</Content>;
    case CalculationResultType.CUSTOM_OPTIONS_SELECTED:
      return (
        <Content className="custom-options-content" style={{ textAlign: 'center' }}>
          <p>{message}</p>
          <FormInput type="email" value={email} placeholder="Twój adres email" onChange={setEmail} />
          <PrimaryButton label={messages.submitButtonText} onClick={onSubmit} />
        </Content>
      );
    case CalculationResultType.NOT_ENOUGH_OPTIONS:
      return (
        <Content className="not-enough-options-content">
          <p>{message}</p>
        </Content>
      );
  }
};

export const InquiryResultModal: React.FC<IInquiryResultModal> = (props: IInquiryResultModal) => {
  const { messages, totalScore } = props;
  const content = totalScore ? ModalContent(totalScore, messages, props.onSubmit) : null;

  return (
    <Modal onClose={props.onClose}>
      <ContentWrapper style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>{messages.resultHeader}</h2>
        {content}
      </ContentWrapper>
    </Modal>
  );
};
