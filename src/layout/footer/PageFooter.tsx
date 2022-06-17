import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { color, Device, padding, pageWidth } from '../../styles/theme';

import LogoWhite from 'assets/logo/pola-white.svg';
import { SubscribeDialog } from '../../newsletter/components/SubscribeDialog';
import { IPolaState } from '../../state/types';
import { newsletterDispatcher } from '../../newsletter/state/newsletter-dispatcher';
import { FooterSection } from './FooterSection';
import { CommunitySections } from './CommunitySections';

const FooterContainer = styled.footer`
  background-color: ${color.background.dark};
  color: ${color.text.light};
  margin: 0 auto;
  width: 100%;
  padding-top: ${padding.big};
  padding-bottom: ${padding.big};

  .footer-content {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;

    @media ${Device.Desktop} {
      max-width: ${pageWidth};
    }
  }
`;

const connector = connect(
  (state: IPolaState) => {
    const { newsletter } = state;
    return {
      newsletterStatus: newsletter.status,
    };
  },
  {
    subscribeEmail: newsletterDispatcher.subscribeEmail,
  }
);

type PageFooterProps = ConnectedProps<typeof connector> & {};

const FlexHorizontal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const PageFooter: React.FC<PageFooterProps> = ({ newsletterStatus, subscribeEmail }) => {
  return (
    <FooterContainer>
      <FlexHorizontal>
        <SubscribeDialog status={newsletterStatus} onSubmit={subscribeEmail} />
      </FlexHorizontal>
      <div className="footer-content">
        <FooterSection>
          <div className="logo">
            <img src={LogoWhite} />
          </div>
        </FooterSection>
        <CommunitySections />
      </div>
    </FooterContainer>
  );
};

export default connector(PageFooter);
