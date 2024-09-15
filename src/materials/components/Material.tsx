import styled from 'styled-components';

import React from 'react';

import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';

import { Device, color, fontSize, margin, padding } from '@Styles/theme';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import '@Components/Pagination.css';
import { IMaterial } from 'materials';
import { MaterialPrevImage } from './MaterialPrevImage';

const MaterialContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${padding.normal};
    max-width: 1000px;
    margin: auto;

    @media ${Device.mobile} {
        flex-direction: column;
        gap: ${padding.big};
    }
`;

const MaterialWrapper = styled.div`
    width: 100%;
    padding-bottom: ${padding.huge};

    h2{
        text-align: center;
        padding-bottom: ${padding.big};
    }
`;

const TextColumn = styled(ContentColumn)`
    max-width: 650px;
    width: 100%;
    flex-direction: column;
    display: flex;
    gap: ${padding.normal};

    p{
        margin: 0;
        padding: 0;
    }

    @media ${Device.mobile} {
        flex-direction: column-reverse;
    }
`

const ImageColumn = styled(ContentColumn)`
    max-width: 250px;
    width: 100%;
    
    @media ${Device.mobile} {
        margin: auto;
    }
`

const DownloadButton = styled(PrimaryButton)`
    padding: 8px 0;
    margin: 0;
    font-size: ${fontSize.tiny};
    width: 5.5rem;
`

const Material: React.FC<IMaterial> = ({ title, description, prevImage, file }) => {
    return (
        <MaterialWrapper>
            <h2>{title}</h2>
            <MaterialContent>
                <ImageColumn fraction={20}>
                    <MaterialPrevImage imageSrc={prevImage.url} title={prevImage.title} />
                </ImageColumn>
                <TextColumn fraction={80}>
                    <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}></div>
                    <a target='blank' href={file.url}>
                        <DownloadButton label='pobierz raport' />
                    </a>
                </TextColumn>
            </MaterialContent>
        </MaterialWrapper>
    );
};

export default Material;
