import React from 'react';

import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { PageSection } from '@Layout/PageSection';
import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { color, padding } from '@Styles/theme';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { connect } from 'react-redux';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
    width: fit-content;
    margin: auto;

    .input-container{
        padding: 0;
        padding-bottom: 0.1em;
    }

    input{
        padding: 8px !important;
        border-radius: 20px;
        font-size: 16px;
        border: ${color.text.red} 1px solid;
    }
`

type INewsletterPage = any;

const connector = connect(
    (state: IPolaState) => {
        const { newsletter } = state;
        return {
            newsletterStatus: newsletter.status,
            follower: newsletter.status !== 'initial' ? newsletter.follower : undefined,
        };
    },
    {
        subscribeEmail: newsletterDispatcher.requestSubscriptionForEmail,
        clearForm: newsletterDispatcher.clearSubscriptionFormData,
    }
);

const NewsletterPage: React.FC<INewsletterPage> = ({ location, newsletterStatus, follower, subscribeEmail, clearForm }) => {
    return (
        <PageLayout location={location} page={PageType.NEWSLETTER} styles={{ marginTop: padding.big }}>
            <SEOMetadata pageTitle="Newsletter" />
            <PageSection>
                <TitleSection>Newsletter Poli</TitleSection>
                <Text>
                    Dzięki newsletterowi aplikacji Pola będziesz mieć wpływ na rozwój tego projektu. Wysyłamy tylko jeden e-mail miesięcznie z najważniejszymi informacjami na temat projektu. Przed podjęciem ważnych kroków, konsultujemy się z naszymi sympatykami za pomocą newslettera. Zostaw tutaj swój e-mail i buduj z nami świadomą konsumpcję i patriotyzm gospodarczy!
                </Text>
            </PageSection>
            <PageSection>
                <Container>
                    <SubscribeDialog
                        status={newsletterStatus}
                        follower={follower}
                        styles={{ height: "9rem" }}
                        onSubmit={subscribeEmail}
                        onClear={clearForm}
                        isAlwaysExpanded={true}
                    />
                </Container>
            </PageSection>
            <PageSection>
                <Text>
                    Administratorem Twoich danych osobowych będzie wydawca aplikacji Pola, Klub Jagielloński. <b>Twój mail nie trafi do bazy mailowej Klubu Jagiellońskiego. Będziesz otrzymywać tylko informacje o aplikacji Pola.</b> Korzystamy z platformy GetResponse, to bezpieczne i sprawdzone narzędzie do budowania newsletterów.
                </Text>
                <Text>
                    Naszą politykę prywatności znajdziesz pod tym linkiem: <br /><Link to="/privacy-policy">https://www.pola-app.pl/privacy-policy</Link>
                </Text>
                <Text>
                    Polityka prywatności Klubu Jagiellońskiego znajduje się tutaj: <br /><a href="https://klubjagiellonski.pl/polityka-prywatnosci-i-regulamin/">https://klubjagiellonski.pl/polityka-prywatnosci-i-regulamin/</a>
                </Text>
            </PageSection>
        </PageLayout>
    );
};

export default connector(NewsletterPage);
