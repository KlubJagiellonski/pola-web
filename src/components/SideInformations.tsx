import { IFriendData } from 'friends';
import { IArticleData } from 'posts';
import styled from 'styled-components';

import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

import FriendCard from '../friends/components/FriendCard';
import ArticlesListPreview from '../posts/articles/list/ArticlesListPreview';
import TagsList from '../posts/tags/TagsList';
import { getRandomFriend } from 'friends/state/friends-selectors';
import { buildArticlesQuery, getVisibleArticles, useArticlesParams } from 'posts/services/article-service';
import { getUniqueTags } from 'posts/services/url-service';
import { TagLinks } from 'posts/tags/TagLinks';

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

const ArticlesWrapper = styled.div`
  .gatsby-image-wrapper {
    height: 10em !important;
  }
`;

interface ISideInformations {
  actualArticleId: string;
  articles: IArticleData[];
  friends?: IFriendData[];
}

const SideInformations: React.FC<ISideInformations> = ({ actualArticleId, articles, friends }) => {
  const [articlesPreview, setArticlesPreview] = useState<IArticleData[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<IFriendData>();
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
        <TagLinks tags={articles && getUniqueTags(articles)} />
      </SecondSection>
      <Title>Zobacz także:</Title>
      <ArticlesWrapper>
        <ArticlesListPreview articles={articlesPreview} />
      </ArticlesWrapper>
      {friends && selectedFriend && <FriendCard {...selectedFriend} />}
    </Wrapper>
  );
};

export default SideInformations;
