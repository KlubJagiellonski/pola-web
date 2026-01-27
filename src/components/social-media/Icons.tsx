import { urls } from 'app/website';
import React from 'react';
import styled from 'styled-components';

import FacebookIcon from '@Assets/social-media/facebook.png';
import FacebookIconFill from '@Assets/social-media/facebook_fill.png';
import InstagramIcon from '@Assets/social-media/instagram.png';
import InstagramIconFill from '@Assets/social-media/instagram_fill.png';
import TwitterIcon from '@Assets/social-media/twitter.png';
import TwitterIconFill from '@Assets/social-media/twitter_fill.png';

const SocialMediaLink = styled.a`
  flex: 1;
  text-align: center;
`;

interface IIcon {
  href: string;
  img: string;
  alt?: string;
}

const Icon: React.FC<IIcon> = ({ href, img, alt }) => {
  return (
    <SocialMediaLink href={href} target="blank">
      <img src={img} alt={alt} />
    </SocialMediaLink>
  );
};

interface ISocialMedia {
  type?: 'unfilled' | 'filled';
  alt?: string;
}

export const Facebook: React.FC<ISocialMedia> = ({ type, alt = 'Facebook' }) => {
  return (
    <Icon
      href={urls.external.polaSocialMedia.facebook.href}
      img={type === 'filled' ? FacebookIconFill : FacebookIcon}
      alt={alt}
    />
  );
};

export const Instagram: React.FC<ISocialMedia> = ({ type, alt = 'Instagram' }) => {
  return (
    <Icon
      href={urls.external.polaSocialMedia.instagram.href}
      img={type === 'filled' ? InstagramIconFill : InstagramIcon}
      alt={alt}
    />
  );
};

export const Twitter: React.FC<ISocialMedia> = ({ type, alt = 'Twitter' }) => {
  return (
    <Icon
      href={urls.external.polaSocialMedia.twitter.href}
      img={type === 'filled' ? TwitterIconFill : TwitterIcon}
      alt={alt}
    />
  );
};
