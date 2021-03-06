import React from 'react';
import { urls } from '../../domain/website';

interface IIconLink {
  height?: number;
}

export const GooglePlayLink: React.FC<IIconLink> = ({ height = 'auto' }) => (
  <a href={urls.external.polaGooglePlay.href}>
    <img
      height={height}
      src="https://pola-app.s3.amazonaws.com/images/badge-googleplay.png"
      alt="Pola application on Google Play"
    />
  </a>
);

export const AppStoreLink: React.FC<IIconLink> = ({ height = 'auto' }) => (
  <a href={urls.external.polaAppStore.href}>
    <img
      height={height}
      src="https://pola-app.s3.amazonaws.com/images/badge-appstore.png"
      alt="Pola application on App Store"
    />
  </a>
);
