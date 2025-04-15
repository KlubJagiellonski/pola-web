import { ErrorMessage, SuccessMessage } from 'components/form-input/FormToast';
import { Follower } from 'newsletter';
import * as React from 'react';

import { urls } from '@App/website';

import { SubscibeDialogFrame } from './SubscirbeDialogFrame';

export const SubscriptionRegisteredResult: React.FC<{ follower: Follower; clearButton: JSX.Element }> = ({
  follower,
  clearButton,
}) => (
  <SubscibeDialogFrame title="Wysłano link potwierdzający!" nextActionButton={clearButton}>
    <SuccessMessage>
      Na adres <span className="email-address">{follower.email}</span> wysłaliśmy prośbę o potwierdzenie. Otwórz
      wiadomość (sprawdź folder "Spam") i kliknij link, aby dopisać Twój adres do newslettera Poli.
    </SuccessMessage>
  </SubscibeDialogFrame>
);

export const SubscriptionRepeatedResult: React.FC<{ follower: Follower; clearButton: JSX.Element }> = ({
  follower,
  clearButton,
}) => (
  <SubscibeDialogFrame title="Ten adres oczekuje na potwierdzenie" nextActionButton={clearButton}>
    <SuccessMessage>
      Adres <span className="email-address">{follower.email}</span> został już dodany do newslettera bądź oczekuje w
      kolejce, by zostać dodanym. Poszukaj wiadomości w swojej skrzynce pocztowej (sprawdź folder "Spam") i kliknij w
      link, aby dopisać Twój adres do newslettera Poli.
    </SuccessMessage>
  </SubscibeDialogFrame>
);

export const SubscriptionFailureResult: React.FC<{ clearButton: JSX.Element }> = ({ clearButton }) => (
  <SubscibeDialogFrame title="Subskrypcja nie powiodła się" nextActionButton={clearButton}>
    <ErrorMessage>
      Wystąpił błąd podczas dopisywania Twojego adresu email do newslettera Poli. Jeżeli dopisywałeś adres już
      wcześniej, poszukaj maila z linkiem potwierdzającym w swojej aplikacji pocztowej (sprawdź folder "Spam"). Jeśli
      problem będzie się powtarzał, zgłość błąd na adres{' '}
      <a className="email-address" href={urls.external.mail.Perowicz.href}>
        mateusz.perowicz@klubjagiellonski.pl
      </a>
      .
    </ErrorMessage>
  </SubscibeDialogFrame>
);
