import React, { useEffect, useState } from 'react';
import { Wrapper, LeftColumn, RightColumn, Column, Grid } from './Contents.css';
import DevelopmentSection from './DevelopmentSection';
import SocialMedia from './SocialMedia';
import { ArticlesList } from '../components/articles/ArticlesList';
import Friends from './Friends';
import Teams from './Teams';
import Download from './Download';
import About from './About';
import { color } from '../styles/theme';
import { IArticle } from '../domain/articles';
import TeamsFriend from './TeamsFriend';

interface IContent {
  articles?: IArticle[];
}

const Contents: React.FC<IContent> = ({ articles }) => {

  return (
    <Wrapper>
    <ArticlesList articles={articles}/>
    <DevelopmentSection />
    <SocialMedia />
    <About />
    <Friends /> 
    <Teams/>
    <TeamsFriend/>
    <Download /> 
  </Wrapper>
  );
};

export default Contents;