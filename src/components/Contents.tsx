import { IFriendData } from 'friends';
import { Article } from 'posts';
import styled from 'styled-components';

import React from 'react';

import ArticlesListPreview from '../posts/components/list/ArticlesListPrewiev';
import Friends from './friends/Friends';

import About from './About';
import DevelopmentSection from './DevelopmentSection';
import Teams from './Teams';
import TeamsFriend from './TeamsFriend';
import SocialMedia from './social-media/SocialMedia';

import { Device, padding } from '@Styles/theme';

const Wrapper = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-top: ${padding.normal};
  display: grid;
  grid-gap: 15px;
  grid-template-areas:
    'articles development'
    'articles social-media'
    'articles about'
    'friends friends'
    'teams-friend teams';

  @media ${Device.mobile} {
    margin: 0;
    padding: 0;
    grid-gap: 0px;
    grid-template-areas:
      'development'
      'articles'
      'about'
      'social-media'
      'friends'
      'teams-friend'
      'teams';
  }
`;

interface IContent {
  articles?: Article[];
  friends?: IFriendData[];
}

const Contents: React.FC<IContent> = ({ articles, friends }) => {
  return (
    <Wrapper>
      <ArticlesListPreview articles={articles} />
      <DevelopmentSection />
      <SocialMedia />
      <About />
      <Friends friends={friends} />
      <Teams />
      <TeamsFriend />
    </Wrapper>
  );
};

export default Contents;
