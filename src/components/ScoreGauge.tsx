import React from "react";
import styled, { keyframes } from "styled-components";
import { lighten } from "polished";

import { seconds } from "app/generics";
import { color, fontSize } from "@Styles/theme";

export interface IAnimation {
  duration: seconds;
  delay?: seconds;
  iterations?: number;
}

interface IScoreGauge {
  value?: number | null;
  unit?: string;
  animation?: IAnimation;
  missingValuePlaceholder?: number | string;
}

// PARAMETRY
const SIZE = 120;
const STROKE = 12;
const CX = SIZE / 2;
const CY = SIZE / 2; // przesunięcie w dół, aby wyśrodkować wizualnie
const R = (SIZE - STROKE) / 2;

// Łuk 270° od -135° do +135°
const startAngle = (225 * Math.PI) / 180;
const endAngle = (-45 * Math.PI) / 180;

const arcLength = R * (Math.abs(endAngle - startAngle)); // pełne 270° łuku

// GENERATOR ŁUKU
const describeArc = () => {
  const x1 = CX + R * Math.cos(startAngle);
  const y1 = CY + R * Math.sin(startAngle);
  const x2 = CX + R * Math.cos(endAngle);
  const y2 = CY + R * Math.sin(endAngle);

  return `M ${x1} ${y1} A ${R} ${R} 0 1 1 ${x2} ${y2}`;
};

// ANIMACJA
const animateArc = (value: number) => keyframes`
  from { stroke-dashoffset: ${arcLength}; }
  to   { stroke-dashoffset: ${(1 - value / 100) * arcLength}; }
`;


const GaugeWrapper = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .label {
    position: absolute;
    font-size: 19px;
    font-weight: bold;
    z-index: 2;
    text-align: center;
    top: 32px;
  }

  .subtitle {
    position: absolute;
    top: 86px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: ${color.text ? color.text.primary : "#000"};
    z-index: 2;
  }
`;

const TrackPath = styled.path`
  stroke: ${color.background.primary};
  stroke-width: ${STROKE};
  fill: none;
  opacity: 0.2;
  stroke-linecap: round;
`;


const ValuePath = styled.path<{ value: number; animation?: IAnimation }>`
  stroke: ${lighten(0.1)(color.background.red)};
  stroke-width: ${STROKE};
  fill: none;
  stroke-linecap: round;

  stroke-dasharray: ${arcLength};
  stroke-dashoffset: ${({ value }) => (1 - value / 100) * arcLength};

  animation-name: ${({ value }) => animateArc(value)};
  animation-duration: ${({ animation }) => (animation?.duration || 0) + "s"};
  animation-delay: ${({ animation }) => (animation?.delay || 0) + "s"};
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

export const ScoreGauge: React.FC<IScoreGauge> = ({
  value,
  unit,
  animation,
  missingValuePlaceholder,
}) => {
  if (value === undefined) {
    return (
      <GaugeWrapper>
        <div className="label">{missingValuePlaceholder}</div>
      </GaugeWrapper>
    );
  }

  const safeValue = value ?? 0;
  const label = unit ? `${safeValue} ${unit}` : safeValue.toString();

  const arc = describeArc();

  return (
    <GaugeWrapper>
      <svg width={SIZE} height={SIZE}  viewBox={`0 -${SIZE * 0.65} ${SIZE} ${SIZE * 1.22}`}>
        <TrackPath d={arc} />
        <ValuePath d={arc} value={safeValue} animation={animation} />
      </svg>

         <div className="label">{label}</div>
         <div className="subtitle">Polski kapitał</div>
    </GaugeWrapper>
  );
};
