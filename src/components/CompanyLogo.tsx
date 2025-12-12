import styled from 'styled-components';

import React, { useState } from 'react';

import { color, padding } from '@Styles/theme';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${padding.normal};
  background-color: ${color.background.lightGray};
  border-radius: 0.5rem;
  padding: ${padding.normal};
  min-height: 80px;

  img {
    max-width: 100%;
    max-height: 120px;
    object-fit: contain;
  }
`;

const FallbackText = styled.div`
  font-size: 0.875rem;
  color: ${color.inactive};
  text-align: center;
  font-style: italic;
`;

interface ICompanyLogo {
  logoUrl?: string;
  companyName: string;
}

export const CompanyLogo: React.FC<ICompanyLogo> = ({ logoUrl, companyName }) => {
  const [loadError, setLoadError] = useState(false);

  if (!logoUrl || loadError) {
    return null;
  }

  const handleImageError = () => {
    setLoadError(true);
    console.warn(`Failed to load logo for ${companyName} from ${logoUrl}`);
  };

  return (
    <LogoContainer>
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        loading="lazy"
        onError={handleImageError}
      />
    </LogoContainer>
  );
};

export default CompanyLogo;
