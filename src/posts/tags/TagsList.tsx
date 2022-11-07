import { encodeStringToBase64 } from '../services/url-service';
import styled from 'styled-components';

import React from 'react';

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

interface ITagsList {
  availableTags: string[];
  activeTags?: string[];
  onTagSelected?: (tag: string) => void;
  onTagUnselected?: (tag: string) => void;
}

const TagsList: React.FC<ITagsList> = ({ availableTags, activeTags, onTagSelected, onTagUnselected }) => {
  const encodedActiveTags = activeTags ? activeTags.map((tag) => encodeStringToBase64(tag)) : [];
  const handleClick = (tag: string) => {
    if (onTagSelected && onTagUnselected) {
      encodedActiveTags?.includes(tag) ? onTagUnselected(tag) : onTagSelected(tag);
    }
  };

  return (
    <div>
      <Title>Kategorie</Title>
      <Wrapper>
        {availableTags &&
          availableTags.map((tag: string) => (
            <Tag
              key={`tag_${getGuid()}`}
              label={tag}
              active={activeTags?.includes(encodeStringToBase64(tag))}
              onClick={() => handleClick(encodeStringToBase64(tag))}
            />
          ))}
      </Wrapper>
    </div>
  );
};

export default TagsList;
