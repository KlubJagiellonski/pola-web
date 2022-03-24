import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ErrorMessage, SuccessMessage } from '../../components/form-input/FormToast';
import { fontSize, color, padding } from '../../styles/theme';
import { validateEmail } from '../../utils/strings';
import { SubscriptionStatus } from '../state/newsletter-reducer';
import { SubscribeInput } from './SubscribeInput';

interface INewsletterFormStyles {
  spaceTop?: string;
  spaceBottom?: string;
}

const Container = styled.div<{ styles?: INewsletterFormStyles }>`
  max-width: 25em;
  padding-top: ${({ styles }) => styles?.spaceTop || 0};
  padding-bottom: ${({ styles }) => styles?.spaceBottom || 0};
`;

const Form = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  z-index: 10;
`;

interface ISubscribeForm {
  status: SubscriptionStatus;
  styles?: INewsletterFormStyles;
  onSubmit: (email: string, name?: string) => void;
}

export const SubscribeForm: React.FC<ISubscribeForm> = ({ status, styles, onSubmit }) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>();

  const updateName = (value: string) => setName(value);
  const updateEmail = (value: string) => setEmail(value);

  const handleSubscribe = () => {
    const validationMessage = validateEmail(email);
    setEmailErrorMessage(validationMessage);
    if (email && !validationMessage) {
      onSubmit(email, name);
    }
  };

  return (
    <Container styles={styles}>
      <h2>Zapisz się do newslettera Poli</h2>
      <Form>
        <SubscribeInput
          name="follower-name"
          type="text"
          value={name}
          placeholder="Imię Nazwisko"
          onChange={updateName}
        />
        <SubscribeInput
          name="follower-email"
          type="email"
          value={email}
          errorMessage={emailErrorMessage}
          placeholder="Twój email"
          onChange={updateEmail}
        />
        <SecondaryButton label="Zapisz" onClick={handleSubscribe} styles={ButtonThemes.Red} />
        {status === 'subscribed' && (
          <SuccessMessage>Twój email został dopisany do bazy newslettera Poli!</SuccessMessage>
        )}
        {status === 'failure' && (
          <ErrorMessage>Wystąpił błąd podczas dopisywania Twojego emaila do newslettera Poli.</ErrorMessage>
        )}
      </Form>
    </Container>
  );
};
