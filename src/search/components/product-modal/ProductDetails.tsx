import React from 'react';
import { RussiaInfoBox } from '../results-list/RussiaInfoBox';
import { Product, IManufacturer } from 'search';
import styled from 'styled-components';
import { ScoreBar } from '@Components/ScoreBar';
import { ScoreGauge } from '@Components/ScoreGauge';
import { PolishPropertyName, getPropertiesFromManufacturer } from './PolishValues';
import { AppSettings } from 'app/app-settings';
import InfoIcon from '@Assets/info.results.png';
import { ReadMoreArea } from '../../../components/ReadMoreArea';

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

const CriterionItem: React.FC<{ condition: boolean; label: string }> = ({ condition, label }) => (
  <div style={{
    display: "flex",
    alignItems: 'center',
    gap: "0.7rem",
    fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
    flexShrink: 0,
    minWidth: 0,
    
  }}>
    {condition ? (
      <svg
        width="1.2em"
        height="1.2em"
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: 'inline-block', verticalAlign: 'middle', color: color.red, flexShrink: 0, minWidth: '1.2em', minHeight: '1.2em' }}
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: color.inactive, flexShrink: 0, minWidth: '1.2em', minHeight: '1.2em' }}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    )}
    {label}
  </div>
);

// ------------ GŁÓWNY KOMPONENT ---------------

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
      <ScoreGauge
        value={capitalProperty.value}
        unit="%"
        animation={{ duration: 1 }}
        missingValuePlaceholder="—"
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
        />
        <br />
      </CriteriaList>
    </CriteriaRow>

    {/* Notatki o kapitale, producent */}
    {AppSettings.SHOW_POLISH_VALUE_NOTES && capitalProperty.notes && (
      <Notes>{capitalProperty.notes}</Notes>
    )}

    {product.manufacturer.description && (
      <ManufacturerDesc><ReadMoreArea text={product.manufacturer.description} maxLength={184} /></ManufacturerDesc>
    )}
  </DetailsContainer>
);
};
