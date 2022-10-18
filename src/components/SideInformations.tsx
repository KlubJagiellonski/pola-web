import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Article } from '@Domain/articles';
import { Friend } from '@Domain/friends';

import { getVisibleArticles } from '@Utils/articles';
import { getRandomFriend } from '@Utils/friends';
import { getTagsList } from '@Utils/tags';

import FriendCard from '../friends/components/FriendCard';
import ArticlesListPreview from '../posts/articles/list/ArticlesListPreview';
import TagsList from '../posts/tags/TagsList';
import DevelopmentSection from './DevelopmentSection';
import SocialMedia from './social-media/SocialMedia';

import { Device, margin } from '@Styles/theme';

const Wrapper = styled.div`
  gap: ${margin.normal};
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-weight: bold;
`;

const FirstSection = styled.div`
  @media ${Device.mobile} {
    display: none;
  }
`;

const SecondSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margin.normal};

  @media ${Device.mobile} {
    flex-direction: column-reverse;
  }
`;

interface ISideInformations {
  actualArticleId: string;
  articles: Article[];
  friends?: Friend[];
}

const SideInformations: React.FC<ISideInformations> = ({ actualArticleId, articles, friends }) => {
  const [articlesPreview, setArticlesPreview] = useState<Article[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend>();

  useEffect(() => {
    if (articles) {
      setArticlesPreview(getVisibleArticles(actualArticleId, articles));
    }
  }, [articles]);

  useEffect(() => {
    if (friends) {
      setSelectedFriend(getRandomFriend(friends));
    }
  }, [friends]);

  return (
    <Wrapper>
      <FirstSection>
        <DevelopmentSection />
      </FirstSection>
      <SecondSection>
        <SocialMedia />
        <TagsList tag={articles && getTagsList(articles)} />
      </SecondSection>
      <Title>Zobacz także:</Title>
      <ArticlesListPreview articles={articlesPreview} />
      {friends && selectedFriend && <FriendCard {...selectedFriend} />}
    </Wrapper>
  );
};

export default SideInformations;
