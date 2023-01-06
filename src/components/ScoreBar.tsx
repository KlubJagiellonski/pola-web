import { seconds } from 'app/generics';
import { lighten } from 'polished';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { color, fontSize, lineHeight, padding } from '@Styles/theme';

const progressValue = (percentage?: number) => keyframes`
    0% {width: 0}
    100% {width: ${`${percentage || 0}%`}}
`;

const BarComponent = styled.div`
  width: 100%;
  background-color: ${color.background.primary};
  padding: 0;
  height: ${lineHeight.big};
  position: relative;

  .label {
    position: absolute;
    font-size: ${fontSize.small};
    width: 100%;
    z-index: 1;
  }
`;

const ValueBar = styled(BarComponent)<{ value?: number; animation?: IAnimation }>`
  text-align: right;

  .value-belt {
    position: absolute;
    background-color: ${lighten(0.1)(color.background.red)};
    height: 100%;
    z-index: 0;

    animation-name: ${(props) => progressValue(props.value)};
    animation-delay: ${({ animation }) => animation?.delay + 's' || 0};
    animation-duration: ${({ animation }) => animation?.duration + 's' || 0};
    animation-iteration-count: ${({ animation }) => animation?.iterations || 1};
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-play-state: running;
  }

  .label {
    right: ${padding.small};
  }
`;

const TextBar = styled(BarComponent)`
  text-align: left;
  .label {
    right: auto;
    left: ${padding.normal};
  }
`;

export interface IAnimation {
  duration: seconds;
  delay?: seconds;
  iterations?: number;
}

interface IScoreBar {
  value?: number;
  unit?: string;
  animation?: IAnimation;
  missingValuePlaceholder?: number | string;
}

export const ScoreBar: React.FC<IScoreBar> = ({ value, unit, animation, missingValuePlaceholder }) => {
  if (value) {
    const scoreText = unit ? `${value} ${unit}` : value.toString();
    return (
      <ValueBar value={value} animation={animation}>
        <div className="value-belt" />
        <div className="label">{scoreText}</div>
      </ValueBar>
    );
  } else {
    return (
      <TextBar>
        <div className="label">{missingValuePlaceholder}</div>
      </TextBar>
    );
  }
};
