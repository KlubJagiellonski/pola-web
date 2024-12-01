import styled from 'styled-components';

import React, { useEffect, useRef } from 'react';
import { useStore } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from '@App/website';
import { AppSettings } from 'app/app-settings';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { SecondaryButton } from '@Components/buttons/SecondaryButton';
import { keys } from '@Utils/keyboard';
import { isNotEmpty } from '@Utils/strings';

import { SearchStateName } from 'search/state/search-reducer';

import { Device, color, fontSize, margin, padding, px } from '@Styles/theme';

import InfoIcon from '@Assets/info-2.png';
import Kod from '@Assets/kod.svg';
import Microphone from '@Assets/microphone.svg';

const FormSearch = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  background-color: white;
  border-radius: 3em;

  @media ${Device.mobile} {
    background-color: transparent;
    flex-direction: column;
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  @media ${Device.mobile} {
    width: 100%;
  }
`;

const InputElement = styled.div`
  padding: 0.25rem;
  width: 100%;
  min-width: 28em;
  height: 56px;
  border-radius: 3em;
  box-sizing: border-box;
`;

const InputSection = styled(InputElement)`
  display: flex;
  justify-content: flex-end;

  @media ${Device.mobile} {
    background-color: white;
    min-width: 0;
  }
`;

const InputText = styled.input`
  background-color: transparent;
  border: none;
  font-size: ${fontSize.normal};
  width: 100%;
  height: 100%;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }

  @media ${Device.mobile} {
    max-width: none;
    width: 100%;
  }
`;

const InputOverlay = styled(InputElement)`
  background-color: black;
  opacity: 0.1;
  position: absolute;
  z-index: 10;
`;

const InputIconSection = styled.div`
  display: flex;
  align-items: center;
  padding: ${padding.tiny} 0;
`;

const InputIcon = styled.div<{ width: number; imagePath: string }>`
  border-radius: 50%;
  background-color: ${color.background.red};
  width: ${(props) => px(props.width)};
  height: 100%;
  margin-right: ${margin.tiny};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-image: url(${(props) => props.imagePath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const SubmitButton = styled(SecondaryButton)`
  margin-left: 15px;
  height: 56px;
  border-radius: 3em;
  margin: 0.1em;

  @media ${Device.mobile} {
    padding: 0 20px;
    margin-left: 0;
    margin-top: 1em;
  }
`;

interface ISearchInput {
  disabled: boolean;
  onInfoClicked: () => void;
  onSearch: (phrase: string) => void;
  onEmptyInput: () => void;
}

export const SearchInput: React.FC<ISearchInput> = ({ disabled, onInfoClicked, onSearch, onEmptyInput }) => {
  const {
    app: { activePage },
    search: searchState,
  } = useStore().getState() as IPolaState;
  const previousPhrase = searchState.stateName !== SearchStateName.INITIAL ? searchState.phrase || '' : '';

  const [phrase, setPhrase] = React.useState<string>(() => previousPhrase);

  const hasPhrase = isNotEmpty(phrase);
  const submitButtonTheme = disabled || !hasPhrase ? ButtonThemes[ButtonFlavor.GRAY] : ButtonThemes[ButtonFlavor.RED];
  let inputRef = useRef<HTMLInputElement>(null);

  const search = () => {
    if (isNotEmpty(phrase)) {
      onSearch(phrase);
    } else {
      onEmptyInput();
    }
  };

  const handlePhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPhrase(value);

    if (AppSettings.search?.SEARCH_ON_INPUT_CHANGE) {
      search();
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (hasPhrase) {
      if (event.key === keys.ENTER.name || event.keyCode === keys.ENTER.code) {
        const inputPhrase = event.currentTarget.value;
        onSearch(inputPhrase);
      }
    }
  };

  useEffect(() => {
    if (activePage === PageType.HOME) {
      setPhrase('');
    }
  }, [activePage]);

  useEffect(() => {
    if (activePage === PageType.HOME && previousPhrase) {
      setPhrase(previousPhrase);
    }
  }, [previousPhrase]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phrase, disabled]);

  return (
    <FormSearch>
      <InputWrapper>
        {disabled && <InputOverlay />}
        <InputSection>
          <InputIcon imagePath={InfoIcon} width={55} onClick={onInfoClicked} />
          <InputText
            autoFocus
            ref={inputRef}
            placeholder="nazwa produktu / kod EAN"
            type="text"
            onChange={handlePhraseChange}
            onKeyDown={handleEnter}
            disabled={disabled}
            value={phrase || ''}
          />
          <InputIconSection>
            {AppSettings.search?.SHOW_BARCODE_ICON && <InputIcon imagePath={Kod} width={48} />}
            {AppSettings.search?.SHOW_VOICE_INPUT_ICON && <InputIcon imagePath={Microphone} width={48} />}
          </InputIconSection>
        </InputSection>
      </InputWrapper>
      {AppSettings.search?.SHOW_SUBMIT_BUTTON && (
        <SubmitButton
          label="Sprawdź"
          styles={{ ...submitButtonTheme, lowercase: true, fontWeight: 'lighter' }}
          disabled={disabled || !hasPhrase}
          onClick={search}
        />
      )}
    </FormSearch>
  );
};
