import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { Input } from '../../components/input';

const Container = styled.div`
  position: absolute;
`;

interface INewsletter {}

export const Newsletter: React.FC<INewsletter> = () => {
  const [email, setEmail] = useState<string>();

  const handleSubscribe = () => {
    console.log('subscribed!');
  };

  return (
    <Container>
      <Input
        name="follower-email"
        type="email"
        value={email}
        placeholder="Twój email"
        onChange={(value: string) => setEmail(value)}
      />
      <SecondaryButton label="Subscribe" onClick={handleSubscribe} styles={ButtonThemes.WhiteRed} />
    </Container>
  );
};
