import { color, fontSize, margin, padding } from '@Styles/theme';
import React from 'react';
import styled from "styled-components";


interface IColected {
  collected: number;
  all: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${fontSize.tiny}
`;

const TextCount = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${fontSize.tiny};

  span{
    color: ${color.text.red};
    font-weight: bold;
  }
`;

const Line = styled.div<IColected>`
    height: 2px;
    background-color: #f0f0f0;
    position: relative;
    margin: ${margin.small} 0;

    .line-red{
        position: absolute;
        height: 100%;
        background-color: ${color.text.red};
        width: ${(props) => props.collected/props.all*100}%;
    }
`

const TextRed = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${fontSize.tiny};
  color: ${color.text.red};
  font-weight: bold;
`;

const Collected: React.FC<IColected> = ({all, collected}) => {
  return (
    <>
    <Wrapper>
        <div className='count'>
            <Text>Zebrana kwota:</Text>
            <TextCount><span>{collected}</span> PLN</TextCount>
        </div>
        <div className='count'>
            <Text>Docelowa kwota:</Text>
            <TextCount><span>{all}</span> PLN</TextCount>
        </div>
    </Wrapper>
    <Line collected={collected} all={all}><div className='line-red'></div></Line>
    <TextRed>{Math.floor(collected/all*100)}%</TextRed>
    </>
  );
};

export default Collected;