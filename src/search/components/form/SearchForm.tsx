import styled from 'styled-components';

import React from 'react';

import { MobileApps } from '@Components/MobileApps';
import ErrorBoundary from '@Utils/error-handling/error-boundary';

import { SearchStateName, checkLoaded } from 'search/state/search-reducer';

import { SearchInput } from './SearchInput';

import { TitleSection } from '@Styles/GlobalStyle.css';
import { Device, color, fontSize, introHeight, lineHeight, margin } from '@Styles/theme';

const Container = styled.div<{ isSearchLoaded?: boolean }>`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: ${introHeight};
  padding-bottom: 70px;
  position: relative;
  text-align: left;

  @media ${Device.mobile} {
    padding: ${(props) => (props.isSearchLoaded ? '100px 0 20px 0' : '32px 0 20px 0')};
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Title = styled(TitleSection)<{ variant: 'wide' | 'centered' }>`
  font-size: ${fontSize.big};
  line-height: ${lineHeight.big};
  text-align: ${(props) => (props.variant === 'centered' ? 'center' : 'left')};
  margin: 0;

  @media ${Device.mobile} {
    width: 100%;
    text-align: center;
    margin-bottom: ${margin.normal};
  }
`;

const SearchWrapper = styled.div<{ isSearchLoaded?: boolean }>`
  margin-top: ${margin.normal};
  display: flex;
  flex-flow: column;
  gap: ${margin.normal};
  width: 100%;
  align-items: baseline;

  @media ${Device.desktop} {
    flex-flow: row nowrap;
    justify-content: center;
  }
  @media ${Device.mobile} {
    margin-top: ${(props) => (props.isSearchLoaded ? '0' : margin.normal)};
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
  searchState: SearchStateName;
  onInfoClicked: () => void;
  onSearch: (phrase: string) => void;
  onEmptyInput: () => void;
  showApps?: boolean;
  variant?: 'wide' | 'centered';
}

export const SearchForm: React.FC<ISearchForm> = ({
  searchState,
  onInfoClicked,
  onSearch,
  onEmptyInput,
  showApps = true,
  variant = 'wide',
}) => {
  const isLoaded = checkLoaded(searchState);
  return (
    <ErrorBoundary scope="search-container">
      <Container>
        <div>
          <Title className="search-title" variant={variant}>
            Sprawdź informacje o produkcie
          </Title>
          <SearchWrapper isSearchLoaded={isLoaded}>
            <SearchInput
              onInfoClicked={onInfoClicked}
              onSearch={onSearch}
              onEmptyInput={onEmptyInput}
              disabled={searchState === SearchStateName.LOADING}
            />
            {showApps && !isLoaded && (
              <div className="mobile-apps">
                <MobileApps size={40} />
              </div>
            )}
          </SearchWrapper>
        </div>
      </Container>
    </ErrorBoundary>
  );
};
