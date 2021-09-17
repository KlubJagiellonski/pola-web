import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux';
import { Friend } from '../../domain/friends'
import { PageType, urls } from '../../domain/website';
import { PageLayout } from '../../layout/PageLayout';
import { PageSection } from '../../layout/PageSection';
import { LoadBrowserLocation, SelectActivePage } from '../../state/app/app-actions';
import { IPolaState } from '../../state/types';
import SEOMetadata from '../../utils/browser/SEOMetadata';
import { color, Device, fontSize, margin } from '../../styles/theme';
import { ResponsiveImage } from '../images/ResponsiveImage';
import { TitleSection, Text, } from '../../styles/GlobalStyle.css';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { ButtonColor } from '../../styles/button-theme';
import { Link } from 'gatsby';
import Card from '../Card';

const WrapperContents = styled(PageSection)`
  @media ${Device.mobile} {
    padding: 0;
  } 
`

const Wrapper = styled.div`
  margin: ${margin.veryBig} 0;
  display: flex;
  gap: ${margin.small};

  @media ${Device.mobile} {
    flex-direction: column;
    margin-left: ${margin.normal};
    margin-right: ${margin.normal}; 
  }
`

const RightColumn = styled.div`
  flex: 1;
  flex-basis: 0;
  position: relative;
`

const LeftColumn = styled.div`
  flex: 2;
  flex-basis: 0;

  @media ${Device.mobile} {
    text-align: center;
  }
`

const ImageSection = styled.div`

@media ${Device.mobile}{
  max-height: 15em;
  margin-bottom: ${margin.normal};

  .gatsby-image-wrapper{
    max-height: 15em;

    picture{
      img{
        max-height: 15em;
        width: auto !important;
        left: 50% !important;
        right: 50% !important;
        transform: translateX(-50%);
      }
    }
  }
}
 
@media ${Device.desktop}{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .gatsby-image-wrapper{
    height: 100%;

    picture{
      img{
        width: auto !important;
        max-width: 100%;
        height: auto !important;
        max-height: 100%;
        left: 50% !important;
        right: 50% !important;
        top: 50% !important;
        transform: translate(-50%,-50%);
      }
    }
  }
}
`

const ButtonSection = styled.div`
  margin-top: ${margin.normal};
  display: flex;
  flex-direction: column;
  gap: ${margin.small};
`

const Button = styled(SecondaryButton)`
  text-transform : capitalize;
  font-weight: bold;
  min-width: 300px;
`

const ButtonWhiteRed = styled(Button)`
  border-color: ${color.border.grey};
`

const ButtonRed = styled(Button)`
  border-color: ${color.background.red};
`

const FriendPage: React.FC<Friend> = ({ name, description, image, page }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.FRIENDS));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle={`Pola Web | ${name}`} />
      <WrapperContents>
        <Wrapper>
          <RightColumn>
            <ImageSection>
              {image && <ResponsiveImage imageSrc={image} />}
            </ImageSection>
          </RightColumn>
          <LeftColumn>
            <TitleSection>{name}</TitleSection>
            <Text>{description}</Text>
            <ButtonSection>
              <a href={page} target="_blank">
                <ButtonRed
                  label="Odwiedź stronę przyjaciela"
                  color={ButtonColor.Red}
                  fontSize={fontSize.small}
                />
              </a>
              <Link to={urls.pola.friends}>
                <ButtonWhiteRed
                  label="Zobacz pozostałych przyjaciół"
                  color={ButtonColor.WhiteRed}
                  fontSize={fontSize.small}
                />
              </Link>
            </ButtonSection>
          </LeftColumn>
        </Wrapper>
        <Card
          title='"We need you!"'
          content="1-2 zdania typu: wesprzyj rozwój Poli wraz z rozwojem osobistym / możesz pomóc rozwijać Aplikację dzięki swoim ujmiejętnościom"
          buttonLabel="Dołącz do zespołu poli!"
          url="/news"
        />
      </WrapperContents>
    </PageLayout>
  )
}

export default connect((state: IPolaState) => ({
  location: state.app.location,
  articles: state.articles.data
}), {})(FriendPage);