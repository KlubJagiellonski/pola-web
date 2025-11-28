import { lighten } from 'polished';
import styled, { keyframes } from 'styled-components';

import React from 'react';

import { seconds } from 'app/generics';

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
  position: relative;
  border-radius: 10px;
  overflow: hidden;

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
  value?: number | null;
  unit?: string;
  animation?: IAnimation;
  missingValuePlaceholder?: number | string;
}

export const ScoreBar: React.FC<IScoreBar> = ({ value, unit, animation, missingValuePlaceholder }) => {
  if (value !== undefined) {
    const knownValue = value !== null ? value : 0;
    const scoreText = unit ? `${knownValue} ${unit}` : knownValue.toString();
    return (
      <ValueBar value={knownValue} animation={animation}>
        <div className="value-belt" data-testid="value-belt" />
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
