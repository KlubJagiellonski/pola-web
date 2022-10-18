import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '@Components/buttons/Button';
import { SecondaryButton } from '@Components/buttons/SecondaryButton';
import { SubscriptionStatus } from '@State/newsletter-reducer';
import { SubscribeForm } from './SubscribeForm';
import { classNames } from '@Utils/class-names';

interface INewsletterFormStyles {
  spaceTop?: string;
  spaceBottom?: string;
}

const Container = styled.div<{ styles?: INewsletterFormStyles }>`
  max-width: 25em;
  padding-top: ${({ styles }) => styles?.spaceTop || 0};
  padding-bottom: ${({ styles }) => styles?.spaceBottom || 0};

  .newsletter-form-container {
    height: 0em;
    overflow: hidden;

    &.expanded {
      transition: height 0.5s;
      height: 13.5rem;
    }
  }
`;

interface ISubscribeDialog {
  status: SubscriptionStatus;
  styles?: INewsletterFormStyles;
  onSubmit: (email: string, name?: string) => void;
}

export const SubscribeDialog: React.FC<ISubscribeDialog> = ({ status, styles, onSubmit }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const container = containerRef.current;
    container?.classList.add('expanded');
    setExpanded(true);
  };

  return (
    <Container styles={styles}>
      {!isExpanded && (
        <SecondaryButton label="Zapisz się do newslettera Poli" onClick={handleClick} styles={ButtonThemes.Red} />
      )}
      <div ref={containerRef} className="newsletter-form-container">
        <SubscribeForm styles={styles} status={status} onSubmit={onSubmit} />
      </div>
    </Container>
  );
};
