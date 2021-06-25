import React from 'react';
import styled from 'styled-components';
import { padding } from '../../styles/theme';

const Footer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: ${padding.big} 0;
`;

interface IArticleFooter {
  post: any;
  author: any;
  slug: string;
  facebook: any;
}

export const ArticleFooter: React.FC<IArticleFooter> = ({ post, slug, author, facebook }) => {
  return <Footer>Footer</Footer>;
};
