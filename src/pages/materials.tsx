import styled from 'styled-components';

import React from 'react';

import { PageType, urls } from 'app/website';

import Faq from '@Components/Faq';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { color, fontSize, margin, padding } from '@Styles/theme';
import { PageProps } from "gatsby";
import { Button } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { connect } from 'react-redux';
import { IPolaState } from '@App/state';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';

const MaterialContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${padding.normal}
`;

const MaterialWrapper = styled.div`
    width: 100%;

    h2{
        text-align: center;
        padding-bottom: ${padding.big};
    }
`;

const TextColumn = styled(ContentColumn)`
    max-width: 800px;
    width: 100%;
`

const ImageColumn = styled(ContentColumn)`
    max-width: 250px;
    width: 100%;
`

const DownloadButton = styled(PrimaryButton)`
    padding: 8px 0;
    margin: 0;
    font-size: ${fontSize.tiny};
    width: 5.5rem;
`


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

const MaterialsPage: React.FC<any> = ({ location, newsletterStatus, follower, subscribeEmail, clearForm }) => {
    return (
        <PageLayout location={location} page={PageType.MATERIALS} styles={{ marginTop: padding.big }}>
            <SEOMetadata pageTitle="Materiały do pobrania" />
            <ColumnsLayout>
                <MaterialWrapper>
                    <h2>Jak zakończyć wojnę na Ukrainie? Scenariusze zakończenia konfliktu.</h2>
                    <MaterialContent>
                        <ImageColumn fraction={20}>
                            <ResponsiveImage imageSrc="sample-m.jpg" title={''} />
                        </ImageColumn>
                        <TextColumn fraction={80}>
                            <p> Dla zachodu preferowanym scenariuszem zakończenia wojny powinno być możliwe jak najszybsze zwycięstwo Ukrainy. W tym wypadku państwa zachodnie nie będą musiały ponosić rosnących kosztów pośrednich konfliktów i ryzykować swoich długoterminowych, strategicznych interesów.</p>
                            <DownloadButton label='pobierz raport' />
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
                        </TextColumn>
                    </MaterialContent>
                </MaterialWrapper>
            </ColumnsLayout>
        </PageLayout >
    );
};

export default connector(MaterialsPage);
