import React from 'react'
import styled from 'styled-components'
import Tag from './Tag'
import { margin } from './../../styles/theme'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

`

const Title = styled.p`
  margin: ${margin.normal}; 
`

interface ITagsList {
  category?: string[],
  activeTags?: string[]
}

const TagsList: React.FC<ITagsList> = ({ category, activeTags }) => {
  return (
    <div>
      <Title>kategorie</Title>
      <Wrapper>
        {category &&
          category.map((el, id) => (
            <Tag key={`tag_${id}`} label={el} active={activeTags?.includes(el)} />
          ))
        }
      </Wrapper>
    </div>
  )
}

export default TagsList;