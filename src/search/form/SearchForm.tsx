import React from 'react';
import styled from 'styled-components';
import { SearchInput } from './SearchInput';
import ErrorBoundary from '@Utils/error-boundary';
import { Device, fontSize, color, margin, lineHeight, introHeight } from '@Styles/theme';
import { TitleSection } from '@Styles/GlobalStyle.css';
import { MobileApps } from '@Components/MobileApps';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: ${introHeight};
  padding-bottom: 70px;
  position: relative;
  text-align: left;

  @media ${Device.mobile} {
    padding: 100px 0 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Title = styled(TitleSection)`
  font-size: ${fontSize.big};
  line-height: ${lineHeight.big};
  text-align: left;
  margin: 0;

  @media ${Device.mobile} {
    width: 100%;
    text-align: center;
    margin-bottom: ${margin.normal};
  }
`;

const SearchWrapper = styled.div`
  margin-top: ${margin.normal};
  display: flex;
  flex-flow: column;
  gap: ${margin.normal};
  width: 100%;

  @media ${Device.desktop} {
    flex-flow: row nowrap;
    justify-content: center;
  }
  @media ${Device.mobile} {
    max-width: 30rem;
  }

  .mobile-apps {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    gap: ${margin.normal};
    align-items: center;

    @media ${Device.mobile} {
      margin-top: ${margin.normal};
      justify-content: space-evenly;
      gap: 0;
    }
  }
`;

interface ISearchForm {
  isLoading: boolean;
  onInfoClicked: () => void;
  onSearch: (phrase: string) => void;
  onEmptyInput: () => void;
}

export const SearchForm: React.FC<ISearchForm> = ({ isLoading, onInfoClicked, onSearch, onEmptyInput }) => {
  return (
    <ErrorBoundary scope="search-container">
      <Container>
        <Title>Sprawdź informacje o produkcie</Title>
        <SearchWrapper>
          <SearchInput
            onInfoClicked={onInfoClicked}
            onSearch={onSearch}
            onEmptyInput={onEmptyInput}
            disabled={isLoading}
          />
          <div className="mobile-apps">
            <MobileApps size={48} />
          </div>
        </SearchWrapper>
      </Container>
    </ErrorBoundary>
  );
};
