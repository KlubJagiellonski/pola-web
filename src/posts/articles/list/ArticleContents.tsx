import React from 'react';

import { getDate } from '@Utils/dates';

import { TagLink } from 'posts/tags/TagLinks';

import { ArticleDate, ArticleTag, ArticleText } from './ArticleContents.css';

interface IArticleContents {
  date?: string;
  text: string;
  tag?: string;
}

const ArticleContents: React.FC<IArticleContents> = ({ date, text, tag }) => {
  return (
    <>
      <div className="article-text-container">
        <ArticleText>{text}</ArticleText>
      </div>

      {date && <ArticleDate>{getDate(date)}</ArticleDate>}
      {tag && (
        <ArticleTag>
          <TagLink label={tag} />
        </ArticleTag>
      )}
    </>
  );
};

export default ArticleContents;
