import debounce from 'lodash.debounce';
import { em } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { Input } from '../../components/input';
import { validateEmail } from '../../utils/strings';

const Container = styled.div`
  position: absolute;
  top: 20em;
  z-index: 10;
`;

interface INewsletter {
  onSubscribe: (email: string) => void;
}

export const Newsletter: React.FC<INewsletter> = ({ onSubscribe }) => {
  const [email, setEmail] = useState<string>();

  const handleChange = debounce((value: string) => setEmail(value), 1000);

  const handleSubscribe = () => {
    console.log('subscribed!');
    if (email && email.length > 0) {
      onSubscribe(email);
    }
  };

  return (
    <Container>
      <Input
        name="follower-email"
        type="email"
        value={email}
        placeholder="Twój email"
        onChange={handleChange}
        validator={validateEmail}
      />
      <SecondaryButton label="Subscribe" onClick={handleSubscribe} styles={ButtonThemes.WhiteRed} />
    </Container>
  );
};
