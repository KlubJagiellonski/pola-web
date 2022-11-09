import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { SubscriptionStatus } from '../state/newsletter-reducer';
import { SubscribeForm } from './SubscribeForm';
import { Follower } from 'newsletter';
import { SubscibeDialogFrame } from './SubscirbeDialogFrame';
import { SubscriptionRegisteredResult, SubscriptionRepeatedResult, SubscriptionFailureResult } from './SubscribeResult';
import { Spinner } from 'components/Spinner';
import { Device } from 'styles/theme';
import { classNames } from 'utils/class-names';

interface INewsletterFormStyles {
  spaceTop?: string;
  spaceBottom?: string;
}

const Container = styled.div<{ styles?: INewsletterFormStyles }>`
  max-width: 25em;
  padding-top: ${({ styles }) => styles?.spaceTop || 0};
  padding-bottom: ${({ styles }) => styles?.spaceBottom || 0};

  .newsletter-frame-container {
    height: 0em;
    overflow: hidden;

    &.expanded {
      transition: height 0.5s;
      height: 14.5rem;
    }
  }
`;

const Buttons = styled.div`
  @media ${Device.mobile} {
    display: flex;
    justify-content: center;
  }
`;

interface ISubscribeDialog {
  status: SubscriptionStatus;
  follower?: Follower;
  styles?: INewsletterFormStyles;
  onSubmit: (email: string, name?: string) => void;
  onClear: () => void;
  stopExpanded?: boolean;
  isInitiallyExpanded: boolean;
}

export const SubscribeDialog: React.FC<ISubscribeDialog> = ({
  status,
  follower,
  styles,
  onSubmit,
  onClear,
  stopExpanded,
  isInitiallyExpanded = false,
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(isInitiallyExpanded);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stopExpanded) {
      const container = containerRef.current;
      container?.classList.remove('expanded');
      setExpanded(false);
    }
  }, [stopExpanded]);

  const handleExpand = () => {
    const container = containerRef.current;
    container?.classList.add('expanded');
    setExpanded(true);
  };

  const handleClear = () => {
    onClear();
  };

  const clearButton = (
    <SecondaryButton label="Lub zapisz inny adres email" onClick={handleClear} styles={ButtonThemes.White} />
  );

  let frameContent;
  switch (status) {
    case SubscriptionStatus.INITIAL:
      frameContent = (
        <SubscibeDialogFrame title="Newsletter Poli">
          <SubscribeForm styles={styles} onSubmit={onSubmit} />
        </SubscibeDialogFrame>
      );
      break;

    case SubscriptionStatus.REQUESTED:
      frameContent = <Spinner />;
      break;

    case SubscriptionStatus.REGISTERED:
      if (follower) {
        frameContent = <SubscriptionRegisteredResult follower={follower} clearButton={clearButton} />;
      }
      break;

    case SubscriptionStatus.REPEATED:
      if (follower) {
        frameContent = <SubscriptionRepeatedResult follower={follower} clearButton={clearButton} />;
      }
      break;

    case SubscriptionStatus.REJECTED:
      frameContent = <SubscriptionFailureResult clearButton={clearButton} />;
      break;
  }

  return (
    <Container styles={styles}>
      {!isExpanded && (
        <Buttons>
          <SecondaryButton label="Newsletter Poli" onClick={handleExpand} styles={ButtonThemes.Red} />
        </Buttons>
      )}
      <div ref={containerRef} className={classNames('newsletter-frame-container', ['expanded', isExpanded])}>
        {frameContent}
      </div>
    </Container>
  );
};
