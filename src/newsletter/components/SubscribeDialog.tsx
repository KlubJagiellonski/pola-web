import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { SubscriptionStatus } from '../state/newsletter-reducer';
import { SubscribeForm } from './SubscribeForm';
import { ErrorMessage, SuccessMessage } from '../../components/form-input/FormToast';
import { Follower } from 'newsletter';
import { SubscibeDialogFrame } from './SubscirbeDialogFrame';
import { urls } from 'domain/website';

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

  .newsletter-frame-container {
    height: 0em;
    overflow: hidden;

    &.expanded {
      transition: height 0.5s;
      height: 14.5rem;
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

  let frameContent;
  switch (status) {
    case 'initial':
      frameContent = (
        <SubscibeDialogFrame title="Zapisz się do newslettera Poli">
          <SubscribeForm styles={styles} onSubmit={onSubmit} />
        </SubscibeDialogFrame>
      );
      break;
    case 'subscribed':
      if (follower) {
        frameContent = (
          <SubscibeDialogFrame title="Wysłano link potwierdzający!">
            <SuccessMessage>
              Na adres <span className="email-address">{follower.email}</span> wysłaliśmy prośbę o potwierdzenie. Otwórz
              wiadomość i kliknij link, aby dopisać Twój adres do newslettera Poli.
            </SuccessMessage>
            <div className="buttons">
              <SecondaryButton label="Lub zapisz inny adres email" onClick={handleClear} styles={ButtonThemes.White} />
            </div>
          </SubscibeDialogFrame>
        );
      }
      break;
    case 'failure':
      frameContent = (
        <SubscibeDialogFrame title="Subskrypcja nie powiodła się">
          <ErrorMessage>
            Wystąpił błąd podczas dopisywania Twojego adresu email do newslettera Poli. Jeżeli dopisywałeś adres już
            wcześniej, poszukaj maila z linkiem potwierdzającym w swojej aplikacji pocztowej (sprawdź folder "Spam").
            Jeśli problem będzie się powtarzał, zgłość błąd na adres{' '}
            <a className="email-address" href={urls.external.mail.Perowicz.href}>
              mateusz.perowicz@klubjagiellonski.pl
            </a>
            .
          </ErrorMessage>
          <div className="buttons">
            <SecondaryButton label="Spróbuj zapisać inny adres" onClick={handleClear} styles={ButtonThemes.White} />
          </div>
        </SubscibeDialogFrame>
      );
      break;
  }

  return (
    <Container styles={styles}>
      {!isExpanded && (
        <div className="buttons">
          <SecondaryButton label="Zapisz się do newslettera Poli" onClick={handleExpand} styles={ButtonThemes.Red} />
        </div>
      )}
      <div ref={containerRef} className="newsletter-frame-container">
        {frameContent}
      </div>
    </Container>
  );
};
