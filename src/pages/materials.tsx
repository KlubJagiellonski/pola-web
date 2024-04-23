import styled from 'styled-components';

import React from 'react';

import { PageType, urls } from 'app/website';

import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { Device, color, fontSize, margin, padding } from '@Styles/theme';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { connect, useSelector } from 'react-redux';
import { IPolaState } from '@App/state';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import '@Components/Pagination.css';
import Materials from 'materials/components/Materials';
import { buildMaterialsQuery, useMaterialsParams } from 'materials/services/material-service';
import { navigate } from 'gatsby';


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
    const materials = useSelector((state: IPolaState) => state.materials.data);
    const { page } = useMaterialsParams();
    const ELEMENTSPERPAGE = 10

    const onPageChange = (val: any) => {
        const url = buildMaterialsQuery({ page: val.selected + 1 });
        if (url) {
            navigate(url);
        }
    }

    return (
        <PageLayout location={location} page={PageType.MATERIALS} styles={{ marginTop: padding.big }}>
            <SEOMetadata pageTitle="Materiały do pobrania" />
            <Materials
                materials={materials.slice((page - 1) * ELEMENTSPERPAGE, (page - 1) * ELEMENTSPERPAGE + ELEMENTSPERPAGE)}
                pages={Math.ceil(materials.length / ELEMENTSPERPAGE)}
                page={page - 1}
                onPageChange={onPageChange}
            />
            <PageSection>
                <Container>
                    <TitleSection>Newsletter Poli</TitleSection>
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
        </PageLayout >
    );
};

export default connector(MaterialsPage);
