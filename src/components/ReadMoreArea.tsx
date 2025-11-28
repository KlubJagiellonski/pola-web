import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  .text {
    display: inline;
  }
  .toggle {
    display: inline-block;
    margin-left: 0.5em;
    color: #d33333;
    cursor: pointer;
    font-weight: 600;
  }
`;

interface IReadMoreArea {
  text: string;
  maxLength?: number;
  moreLabel?: string;
  lessLabel?: string;
}

export const ReadMoreArea: React.FC<IReadMoreArea> = ({
  text,
  maxLength = 250,
  moreLabel = 'Czytaj więcej',
  lessLabel = 'Pokaż mniej',
}) => {
  const [expanded, setExpanded] = React.useState(false);

  if (!text) return null;

  const isLong = text.length > maxLength;
  const shown = !isLong || expanded ? text : text.slice(0, maxLength).trimEnd() + '…';

  return (
    <Container>
      <span className="text">{shown}</span>
      {isLong && (
        <span className="toggle" onClick={() => setExpanded((s) => !s)} role="button" tabIndex={0} onKeyDown={() => setExpanded((s) => !s)}>
          {expanded ? lessLabel : moreLabel}
        </span>
      )}
    </Container>
  );
};

export default ReadMoreArea;
