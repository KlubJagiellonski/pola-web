import React from 'react'
import { Wrapper, Title, Text, InputSection, InputText, InputIconSection, SubmitButton, FormSearch } from './Search.css'
import Kod from './../assets/kod.svg'
import Microphone from './../assets/microphone.svg'

const Search = () => {
  return (
    <Wrapper>
      <Title>
        Sprawdź informacje o produkcie
      </Title>
      <Text>
        Wpisz tekst, podyktuj lub zeskanuj kod<br />
        Nie znasz kodu? <a target='blank' href="https://pl.openfoodfacts.org/">Znajdź go w bazie</a>
      </Text>
      <FormSearch>
        <InputSection>
          <InputText placeholder='Nazwa produktu/producent/kod EAN' type='text' />
          <InputIconSection>
            <img src={Kod} />
            <img src={Microphone} />
          </InputIconSection>
        </InputSection>
        <SubmitButton>
          Sprawdź
        </SubmitButton>
      </FormSearch>
    </Wrapper>
  )
}

export default Search;