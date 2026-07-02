import { CompanyLogo } from '../../../components/CompanyLogo';
import React from 'react';
import { RussiaInfoBox } from '../results-list/RussiaInfoBox';
import { Product} from 'search';
import styled from 'styled-components';
import { Device, margin } from '@Styles/theme';
import { ScoreBar } from '@Components/ScoreBar';
import { ScoreGauge } from '@Components/ScoreGauge';
import { PolishPropertyName, getPropertiesFromManufacturer } from './PolishValues';
import { AppSettings } from 'app/app-settings';
import InfoIcon from '@Assets/info.results.png';
import UnverifiedIcon from '@Assets/circle-off.svg';
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

  @media ${Device.mobile} {
    padding: 0.8em 0.8em;
  }
`;

const Header = styled.header`
  margin-bottom: 0.6em;
  h3 {
    font-size: ${fontSize.pageTitle};
    color: ${color.text};
    font-weight: bold;
    margin: 0;
  }

  @media ${Device.mobile} {
    margin-bottom: 0.4em;

    h3 {
      font-size: 15px;
      line-height: 1.2;
    }
  }
`;

const ScoreRow = styled.div`
  margin-bottom: 1.25em;

  @media ${Device.mobile} {
    margin-bottom: 0.8em;
  }
`;

const FriendBanner = styled.div`
  background: #ffe5e5;
  color: #c10028;
  padding: 10px 0;
  text-align: center;
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: ${margin.small};

  @media ${Device.mobile} {
    font-size: 12px;
    padding: 8px 10px;
    gap: 6px;

    span {
      font-size: 14px;
    }
  }
`;

const ScoreLabel = styled.div`
  font-size: ${fontSize.mediumTitle};
  color: ${color.text};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 14px;
  }

  @media ${Device.mobile} {
    font-size: 13px;

    img {
      width: 12px;
    }
  }
`;

const ScoreBarWrapper = styled.div`
  margin-top: 0.2em;
  width: 100%;

  @media ${Device.mobile} {
    margin-top: 0.3em;
  }
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: ${fontSize.smallTitle};
  margin-bottom: 0.8em;
  color: ${color.text};

  @media ${Device.mobile} {
    font-size: 16px;
    margin-bottom: 0.5em;

    h2 {
      font-size: 14px;
      margin: 0;
    }
  }
`;

const CriteriaRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  align-items: center;
  margin-top: 0.4em;

  @media ${Device.mobile} {
    gap: 0.8em;
    align-items: flex-start;
    margin-top: 0.6em;
  }
`;

const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin-top: 0.3em;
  font-weight: 640;
  line-height: 0.9em;

  @media ${Device.mobile} {
    gap: 0.3em;
    font-size: 13px;
    line-height: 1em;
  }
`;


const Notes = styled.p`
  font-size: ${fontSize.description};
  color: ${color.inactive};
  margin-top: 0.7em;

  @media ${Device.mobile} {
    font-size: 12px;
    margin-top: 0.4em;
  }
`;

const ManufacturerDesc = styled.p`
  font-size: ${fontSize.description};
  font-weight: 600;
  margin-top: 0.6em;
  color: ${color.text};

  @media ${Device.mobile} {
    font-size: 12px;
  }
`;

// ---- STYLE DLA LOGO MAREK ----
const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 20px;
  
  @media ${Device.mobile} {
    gap: 12px;
  }
`;


const BrandTile = styled.div`
  background: #fafafa;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .2s ease, box-shadow .2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  @media ${Device.mobile} {
    font-size: 13px;
  }
`;

const BrandLogo = styled.img`
  max-height: 45px;
  max-width: 100%;
  object-fit: contain;

  @media ${Device.mobile} {
    max-height: 35px;
  }
`;

// ---- POMOCNICZA FUNKCJA ----
const isRealUrl = (url?: string | null) => {
  if (!url) return false;
  const u = url.toLowerCase();
  return !u.includes("example.pl") && !u.includes("example.com");
};


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
        width="0.9em"
        height="0.9em"
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: 'inline-block', verticalAlign: 'middle', color: color.red, flexShrink: 0, minWidth: '0.9em', minHeight: '0.9em' }}
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: color.inactive, flexShrink: 0, minWidth: '0.9em', minHeight: '0.9em' }}>
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


const UnverifiedCompany = () => (
  <div style={{ textAlign: 'center', margin: '2em 0' }}>
    <img
      src={UnverifiedIcon}
      alt="Brak weryfikacji"
      style={{
        width: '120px',
        marginBottom: '20px',
      }}
    />

    <p style={{ fontSize: '16px', color: '#555', fontWeight: 600 }}>
      Niestety, ta firma nie została jeszcze zweryfikowana, więc nie możemy
      wyświetlić jej oceny. Stale rozszerzamy naszą bazę, aby uwzględnić więcej firm.
    </p>

    <p style={{ fontWeight: 700 }}>
      Dziękujemy za cierpliwość!
    </p>
  </div>
);

export const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const manufacturer = product.manufacturer;
  const brandsWithLogo = manufacturer.brands?.filter(b => b.logotype_url) || [];
  const workersProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.WORKERS);
  const researchProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.RnD);
  const registeredProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.REGISTERED);
  const notGlobalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.NOT_GLOBAL);
  const capitalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.CAPITAL);
  const isFriend = !!manufacturer.is_friend;
  const isVerified = product.manufacturer.plScore !== null && product.manufacturer.plScore !== undefined;

  return (
    <DetailsContainer>
      <Header>
        <h3>
          {product.name}
        </h3>
      </Header>
      <RussiaInfoBox product={product} />

      {/* Ocena + progress bar */}
      {isVerified ? (
       <>
        <ScoreRow>
          {isFriend && (
            <FriendBanner>
              <span>❤️</span>
              <span>Ta firma jest Przyjacielem Poli</span>
              <span>❤️</span>
            </FriendBanner>
          )}
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
        </>
      ) : (
        <UnverifiedCompany />
      )}

      {/* Notatki o kapitale, producent */}
      {AppSettings.SHOW_POLISH_VALUE_NOTES && capitalProperty.notes && (
        <Notes>{capitalProperty.notes}</Notes>
      )}

      {product.manufacturer.description && (
        <ManufacturerDesc><ReadMoreArea text={product.manufacturer.description} maxLength={150} /></ManufacturerDesc>
      )}

      {/* Logo producenta */}
        {manufacturer.logotype_url && (
          isRealUrl(manufacturer.official_url) ? (
            <a
              href={manufacturer.official_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "-15px", display: "block" }}
            >
              <CompanyLogo
                logoUrl={manufacturer.logotype_url}
                companyName={manufacturer.name}
              />
            </a>
          ) : (
            <div style={{ marginTop: "5px" }}>
              <CompanyLogo
                logoUrl={manufacturer.logotype_url}
                companyName={manufacturer.name}
              />
            </div>
          )
        )}


        {/* Logo marek */}
        {brandsWithLogo.length > 0 && (
          <div style={{ marginTop: "6px" }}>
            <h4 style={{ fontWeight: "700", color: "#212121", textAlign: "center" }}>
              Marki producenta:
            </h4>

            <BrandsGrid>
              {brandsWithLogo.map((brand, i) => (
                <BrandTile key={i}>
                  {isRealUrl(brand.website_url) ? (
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <BrandLogo src={brand.logotype_url} alt={brand.name} />
                    </a>
                  ) : (
                    <BrandLogo src={brand.logotype_url} alt={brand.name} />
                  )}
                </BrandTile>
              ))}
            </BrandsGrid>
          </div>
        )}

      </DetailsContainer>
  );
};
