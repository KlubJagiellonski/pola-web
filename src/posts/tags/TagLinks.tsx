import { encodeStringToBase64 } from '../services/url-service';
import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { urls } from '@App/website';

import { getGuid } from '@Utils/data/random-number';

import Tag from './Tag';

import { margin } from '@Styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${margin.small};
`;

const Title = styled.p`
  font-weight: bold;
`;

export interface ITagLink {
  label: string;
}
export const TagLink: React.FC<ITagLink> = ({ label }) => {
  const url = `${urls.pola.news()}?page=1&tags=${encodeStringToBase64(label)}`;
  return (
    <Link to={url}>
      <Tag key={`tag_${getGuid()}`} label={label} />
    </Link>
  );
};

interface ITagLinks {
  tags?: string[];
}
export const TagLinks: React.FC<ITagLinks> = ({ tags = [] }) => {
  return (
    <div>
      <Title>Kategorie</Title>
      <Wrapper>
        {tags.map((tag: string) => (
          <TagLink key={tag} label={tag} />
        ))}
      </Wrapper>
    </div>
  );
};
