import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { fontSize, color, padding } from '../../styles/theme';
import { validateEmail } from '../../utils/strings';
import { SubscribeInput } from './SubscribeInput';

const Container = styled.div`
  max-width: 30em;
  padding-top: 60px;
`;

const Form = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  align-items: center;
  z-index: 10;
`;

const ToastMessage = styled.div`
  background-color: ${color.background.transparencyGrey};
  color: ${color.text.black};
  border-radius: 0.2em;
  font-size: ${fontSize.small};
  margin: ${padding.small} ${padding.normal};
  line-height: ${fontSize.small};
  padding: ${padding.small};
`;

const SuccessMessage = styled(ToastMessage)`
  color: ${color.text.secondary};
`;

const ErrorMessage = styled(ToastMessage)`
  color: ${color.text.red};
`;

interface ISubscribeForm {
  onSubscribe: (email: string, name?: string) => void;
}

export const SubscribeForm: React.FC<ISubscribeForm> = ({ onSubscribe }) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const updateName = (value: string) => setName(value);
  const updateEmail = (value: string) => setEmail(value);

  const handleSubscribe = () => {
    const validationMessage = validateEmail(email);
    if (validationMessage) {
      setMessage(validationMessage);
    } else if (email && email.length > 0) {
      setMessage('');
      onSubscribe(email, name);
    }
  };

  return (
    <Container>
      <h2>NEWSLETTER</h2>
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
          placeholder="Twój email"
          onChange={updateEmail}
        />
        <SecondaryButton label="Zapisz" onClick={handleSubscribe} styles={ButtonThemes.Red} />
      </Form>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </Container>
  );
};
