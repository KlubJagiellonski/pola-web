import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { validateEmail } from '../../utils/strings';
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
  styles?: INewsletterFormStyles;
  onSubmit: (email: string, name?: string) => void;
}

export const SubscribeForm: React.FC<ISubscribeForm> = ({ styles, onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>();

  const updateName = (value: string) => setName(value);
  const updateEmail = (value: string) => setEmail(value);

  const handleSubscribe = () => {
    const validationMessage = validateEmail(email);
    setEmailErrorMessage(validationMessage);
    if (email && !validationMessage) {
      onSubmit(email, name);
    }
  };

  useEffect(() => {
    return () => {
      setName('');
      setEmail('');
      setEmailErrorMessage(undefined);
    };
  }, []);

  return (
    <Container styles={styles}>
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
        <SecondaryButton label="Wyślij" onClick={handleSubscribe} styles={ButtonThemes.Red} />
      </Form>
    </Container>
  );
};
