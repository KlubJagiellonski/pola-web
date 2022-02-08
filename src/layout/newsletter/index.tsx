import debounce from 'lodash.debounce';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { FormInput } from '../../components/form-input';
import { fontSize, Device, color, padding } from '../../styles/theme';
import { validateEmail } from '../../utils/strings';

const Container = styled.div`
  max-width: 30em;
`;

const SubscribeForm = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${color.background.white};
  border-radius: 1.5em;
  z-index: 10;
  padding: 0.2em 0.2em 0.2em 1.5em;
`;

const ErrorMessage = styled.div`
  background-color: ${color.background.transparencyGrey};
  color: ${color.text.red};
  border-radius: 0.2em;
  font-size: ${fontSize.small};
  margin: ${padding.small} ${padding.normal};
  line-height: ${fontSize.small};
  padding: ${padding.small};
`;

interface INewsletter {
  onSubscribe: (email: string) => void;
}

export const Newsletter: React.FC<INewsletter> = ({ onSubscribe }) => {
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleChange = (value: string) => setEmail(value);

  const handleSubscribe = () => {
    const validationMessage = email && validateEmail(email);
    if (validationMessage) {
      setMessage(validationMessage);
    } else if (email && email.length > 0) {
      onSubscribe(email);
    }
  };

  return (
    <Container>
      <h2>NEWSLETTER</h2>
      <SubscribeForm>
        <FormInput name="follower-email" type="email" value={email} placeholder="Twój email" onChange={handleChange} />
        <SecondaryButton label="Zapisz" onClick={handleSubscribe} styles={ButtonThemes.Red} />
      </SubscribeForm>
      {message && <ErrorMessage>Nieprawidłowy adres email</ErrorMessage>}
    </Container>
  );
};
