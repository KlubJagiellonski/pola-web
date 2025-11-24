import React from 'react';
import { RussiaInfoBox } from '../results-list/RussiaInfoBox';
import { Product } from 'search';
import styled from 'styled-components';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { ScoreBar } from '@Components/ScoreBar';
import { PolishPropertyName, getPropertiesFromManufacturer } from './PolishValues';
import { AppSettings } from 'app/app-settings';
import InfoIcon from '@Assets/info.results.png';

// ---- PALETA KOLORÓW ----
const color = {
  red: '#D33333',
  backgroundLight: '#F9E6E6',
  text: '#212121',
  inactive: '#AAAAAA',
  divider: '#E5E5E5',
  fieldBg: '#FFFFFF'
};

// ---- ROZMIARY FONTÓW ----
const fontSize = {
  pageTitle: '24px',
  newsTitle: '20px',
  mediumTitle: '16px',
  smallTitle: '12px',
  description: '16px'
};

// ---- STYLE ----
const DetailsContainer = styled.div`
  padding: 1.2em 1em;
  border-top: 1px solid ${color.divider};
  background: ${color.fieldBg};
`;

const Header = styled.header`
  margin-bottom: 0.6em;
  h3 {
    font-size: ${fontSize.pageTitle};
    color: ${color.text};
    font-weight: bold;
    margin: 0;
  }
`;

const ScoreRow = styled.div`
  margin-bottom: 1.25em;
`;

const ScoreLabel = styled.div`
  font-size: ${fontSize.mediumTitle};
  color: ${color.text};
  font-weight: 700;
`;

const ScoreBarWrapper = styled.div`
  margin-top: 0.2em;
  width: 100%;
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: ${fontSize.smallTitle};
  margin-bottom: 0.8em;
  color: ${color.text};
`;

const CriteriaRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  align-items: center;
  margin-top: 0.4em;
`;

const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin-top: 0.3em;
  font-weight: 640;
  line-height: 0.9em;
`;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  position: relative;
  margin-top: -50px;
`;

const Percentage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 27px;
  font-size: ${fontSize.newsTitle};
  font-weight: bold;
  color: ${color.red};
  text-align: center;
`;

const InnerLabel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -13px;
  font-size: ${fontSize.smallTitle};
  color: ${color.text};
  text-align: center;
`;

const Notes = styled.p`
  font-size: ${fontSize.description};
  color: ${color.inactive};
  margin-top: 0.7em;
`;

const ManufacturerDesc = styled.p`
  font-size: ${fontSize.description};
  font-weight: 600;
  margin-top: 0.6em;
  color: ${color.text};
`;

// ---- KOMPONENTY ----

interface PercentCircleProps {
  percent: number;
  label?: string;
}


const PercentCircle: React.FC<{ percent: number; label?: string }> = ({ percent, label }) => {
  const radius = 36;
  const stroke = 7.5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // ---- GAP (proporcja obwodu) ----
  const gap = 0.25;
  const gapLength = circumference * gap;
  const visibleLength = circumference - gapLength;

  // ---- długość faktycznego paska (procent × visibleLength) ----
  const pct = Math.max(0, Math.min(100, Number(percent || 0)));
  const progressLength = (pct / 100) * visibleLength;

  // ---- dasharray dla tła i dla paska ----
  const backgroundArray = `${visibleLength} ${gapLength}`;
  const progressArray = `${progressLength} ${circumference}`;

  // ---- offsety ----
  const baseOffset = visibleLength + gapLength / 2;

  // --- progressOffset ---
  const progressOffset = baseOffset + progressLength;

  return (
    <CircleWrapper>
      <svg width={radius * 2} height={radius * 2}>
        {/* TŁO (szare) */}
        <circle
          stroke={color.backgroundLight}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={stroke}
          strokeDasharray={backgroundArray}
          strokeDashoffset={baseOffset}
          strokeLinecap="round"
          transform={`rotate(90 ${radius} ${radius})`}
        />

        {/* PASEK (czerwony) */}
        {progressLength > 0 && (
          <circle
            stroke={color.red}
            fill="none"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            strokeWidth={stroke}
            strokeDasharray={progressArray}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(90 ${radius} ${radius})`}
            style={{ transition: "stroke-dashoffset 0.5s ease-out, stroke-dasharray 0.5s ease-out" }}
          />
        )}
      </svg>
      <Percentage style={{ color: color.text }}>{pct}%</Percentage>
      {label && <InnerLabel>{label}</InnerLabel>}
    </CircleWrapper>
  );
};


const CriterionItem: React.FC<{ condition: boolean; label: string }> = ({ condition, label }) => (
  <div style={{
    display: "flex",
    alignItems: 'center',
    gap: "0.7rem",
    fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
    flexShrink: 0,
    minWidth: 0,
    
  }}>
    {condition
  ? <FaCheckCircle
      style={{
        color: color.red,
        fontSize: '1.2em',
        minWidth: '1.2em',
        minHeight: '1.2em',
        flexShrink: 0,
        verticalAlign: 'middle'
      }}
    />
  : <FaRegCircle
      style={{
        color: color.inactive,
        fontSize: '1.2em',
        minWidth: '1.2em',
        minHeight: '1.2em',
        flexShrink: 0,
        verticalAlign: 'middle'
      }}
    />
}
    {label}
  </div>
);

// ------------ GŁÓWNY KOMPONENT ---------------
interface Product {
  name: string;
  manufacturer: {
    plScore: number;
    capitalShare: number;
    description?: string;
  };
}
interface Property {
  value: number;
  notes?: string;
}
interface IProductDetails {
  product: Product;
  capitalProperty: Property;
  workersProperty: Property;
  researchProperty: Property;
  registeredProperty: Property;
  AppSettings: { SHOW_POLISH_VALUE_NOTES: boolean };
}


export const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const manufacturer = product.manufacturer;
  const workersProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.WORKERS);
  const researchProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.RnD);
  const registeredProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.REGISTERED);
  const notGlobalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.NOT_GLOBAL);
  const capitalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.CAPITAL);

 return (
  <DetailsContainer>
    <Header>
      <h3>
        {product.name}
      </h3>
    </Header>
    <RussiaInfoBox product={product} />

    {/* Ocena + progress bar */}
    <ScoreRow>
      <ScoreLabel>
        <img src={InfoIcon} alt="Info" style={{ width: '14px', marginRight: '4px' }} />
        Nasza ocena: <b>{product.manufacturer.plScore ?? "-"}</b> pkt
      </ScoreLabel>
      <ScoreBarWrapper>
        {/* ScoreBar - podmień poniżej na swój komponent */}
        <ScoreBar
          value={product.manufacturer.plScore}
          unit="pkt"
          missingValuePlaceholder="brak punktacji w rankingu Poli"
          animation={{ duration: 1, delay: 0.2 }}
        />
      </ScoreBarWrapper>
    </ScoreRow>

    {/* Kryteria oceniania */}
    <Heading><h2>Kryteria oceniania:</h2></Heading>
    <CriteriaRow>
      <PercentCircle
        percent={capitalProperty.value}
        label="Polski kapitał"
      />
      
      <CriteriaList>
        <CriterionItem
          condition={workersProperty.value === 100}
          label="Produkuje w Polsce"
        />
        <CriterionItem
          condition={researchProperty.value === 100}
          label="Prowadzi badania w Polsce"
        />
        <CriterionItem
          condition={registeredProperty.value === 100}
          label="Zarejestrowana w Polsce"
        />
        <CriterionItem
          condition={notGlobalProperty.value === 100}
          label="Nie jest częścią zagranicznego koncernu"
          notes={notGlobalProperty.notes}
        />
        <br />
      </CriteriaList>
    </CriteriaRow>

    {/* Notatki o kapitale, producent */}
    {AppSettings.SHOW_POLISH_VALUE_NOTES && capitalProperty.notes && (
      <Notes>{capitalProperty.notes}</Notes>
    )}

    {product.manufacturer.description && (
      <ManufacturerDesc>{product.manufacturer.description}</ManufacturerDesc>
    )}
  </DetailsContainer>
);
};
