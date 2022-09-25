import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { Modal } from 'layout/modal/Modal';
import { padding } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import { Score } from 'suppliers';
import { ClickOutside } from 'utils/click-outside';

const Content = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 1rem;
  gap: 1rem;
  padding: ${padding.small} ${padding.normal};
`;

export interface IInquiryResultModal {
  totalScore?: Score;
  onClose: () => void;
  onSubmit: () => void;
}

export const InquiryResultModal: React.FC<IInquiryResultModal> = (props: IInquiryResultModal) => (
  <ClickOutside clickOutsideHandler={props.onClose}>
    <Modal styles={{ height: '20rem' }} onClose={props.onClose}>
      <Content>
        <h4>Twój wynik to</h4>
        <h2>{props.totalScore?.value?.toFixed(2)} punktów</h2>
        <PrimaryButton label="Wyślij" onClick={props.onSubmit} />
      </Content>
    </Modal>
  </ClickOutside>
);
