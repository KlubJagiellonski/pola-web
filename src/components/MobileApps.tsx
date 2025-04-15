import styled from 'styled-components';

import React from 'react';

import { AppSettings } from 'app/app-settings';
import { urls } from 'app/website';

import { Device, padding, px } from '@Styles/theme';

interface IIconLink {
  size?: number;
}

const Image = styled.img<IIconLink>`
  height: ${({ size }) => (size ? px(size) : 'auto')};
`;

const DownloadLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    padding: ${padding.small};
  }

  @media ${Device.mobile} {
    flex-direction: row;

    a {
      padding: 0;
    }

    gap: 0.5em;
  }
`;

interface IMobileApps {
  size?: number;
}

export const MobileApps: React.FC<IMobileApps> = ({ size = 48 }) => {
  return (
    <DownloadLinks>
      {AppSettings.mobile?.SHOW_APPLE_STORE_LINK && <AppStoreLink size={size} />}
      {AppSettings.mobile?.SHOW_GOOGLE_PLAY_LINK && <GooglePlayLink size={size} />}
      {AppSettings.mobile?.SHOW_HUAWEI_GALLERY_LINK && <HuaweiAppGalleryLink size={size} />}
    </DownloadLinks>
  );
};

export const GooglePlayLink: React.FC<IIconLink> = ({ size = 48 }) => (
  <a href={urls.external.links.polaGooglePlay.href}>
    <Image
      size={64}
      src="https://play.google.com/intl/en_us/badges/static/images/badges/pl_badge_web_generic.png"
      alt="Pola application on Google Play"
    />
  </a>
);
export const AppStoreLink: React.FC<IIconLink> = ({ size = 0 }) => (
  <a href={urls.external.links.polaAppStore.href}>
    <Image
      size={48}
      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pl-pl?size=250x83&amp;releaseDate=1447113600&h=8701e986920497e467c5544770be8a5c"
      alt="Pola application on App Store"
    />
  </a>
);

export const HuaweiAppGalleryLink: React.FC<IIconLink> = ({ size = 0 }) => (
  <a href={urls.external.links.polaHuaweiAppGallery.href}>
    <Image
      style={{ margin: '-10px' }} // for this specific PNG as there is transparent space around logotype
      size={64}
      src="https://www.newseria.pl/files/_uploaded/glownekonf_37779598.png"
      alt="Pola application on Huawei Store"
    />
  </a>
);
