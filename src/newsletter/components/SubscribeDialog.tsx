import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { SubscriptionStatus } from '../state/newsletter-reducer';
import { SubscribeForm } from './SubscribeForm';
import { ErrorMessage, SuccessMessage } from '../../components/form-input/FormToast';
import { Follower } from 'newsletter';

interface INewsletterFormStyles {
  spaceTop?: string;
  spaceBottom?: string;
}

const Container = styled.div<{ styles?: INewsletterFormStyles }>`
  max-width: 25em;
  padding-top: ${({ styles }) => styles?.spaceTop || 0};
  padding-bottom: ${({ styles }) => styles?.spaceBottom || 0};

  .buttons {
    text-align: center;
  }

  .newsletter-form-container {
    height: 0em;
    overflow: hidden;

    &.expanded {
      transition: height 0.5s;
      height: 13.5rem;
    }

    .email-address {
      font-weight: 900;
    }
  }
`;

interface ISubscribeDialog {
  status: SubscriptionStatus;
  follower?: Follower;
  styles?: INewsletterFormStyles;
  onSubmit: (email: string, name?: string) => void;
  onClear: () => void;
}

export const SubscribeDialog: React.FC<ISubscribeDialog> = ({ status, follower, styles, onSubmit, onClear }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    const container = containerRef.current;
    container?.classList.add('expanded');
    setExpanded(true);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <Container styles={styles}>
      {!isExpanded && (
        <div className="buttons">
          <SecondaryButton label="Zapisz się do newslettera Poli" onClick={handleExpand} styles={ButtonThemes.Red} />
        </div>
      )}
      <div ref={containerRef} className="newsletter-form-container">
        {status === 'initial' && (
          <>
            <h2 className="centered-text">Zapisz się do newslettera Poli</h2>
            <SubscribeForm styles={styles} onSubmit={onSubmit} />
          </>
        )}
        {status === 'subscribed' && follower && (
          <>
            <h2 className="centered-text">Wysłano link potwierdzający!</h2>
            <SuccessMessage>
              Na adres <span className="email-address">{follower.email}</span> wysłaliśmy wiadomość. Otwórz wiadomość i
              kliknij link, aby dopisać Twój adres do newslettera Poli.
            </SuccessMessage>
            <div className="buttons">
              <SecondaryButton label="Lub zapisz inny adres email" onClick={handleClear} styles={ButtonThemes.White} />
            </div>
          </>
        )}
        {status === 'failure' && (
          <ErrorMessage>Wystąpił błąd podczas dopisywania Twojego emaila do newslettera Poli.</ErrorMessage>
        )}
      </div>
    </Container>
  );
};
