import React from 'react'
import { Wrapper, Item } from './SocialMedia.css'
import SocialImg from './../assets/social.png'
import { theme } from './../theme'
import { TitleSection } from './../GlobalStyle.css'

const SocialMedia = () => {
  return (
    <Wrapper color={theme.primary}>
      <Item>
        <TitleSection>
          Social Media
        </TitleSection>
      </Item>
      <Item>
        <img src={SocialImg} />
      </Item>
      <Item>
        <img src={SocialImg} />
      </Item>
      <Item>
        <img src={SocialImg} />
      </Item>
      <Item>
        <img src={SocialImg} />
      </Item>
    </Wrapper>
  )
}

export default SocialMedia;