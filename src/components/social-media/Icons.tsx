import React from 'react';
import styled from 'styled-components';
import { urls } from '@Domain/website';
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
}

const Icon: React.FC<IIcon> = ({ href, img }) => {
  return (
    <SocialMediaLink href={href} target="blank">
      <img src={img} />
    </SocialMediaLink>
  );
};

interface ISocialMedia {
  type?: 'unfilled' | 'filled';
}

export const Facebook: React.FC<ISocialMedia> = ({ type }) => {
  return (
    <Icon
      href={urls.external.polaSocialMedia.facebook.href}
      img={type === 'filled' ? FacebookIconFill : FacebookIcon}
    />
  );
};

export const Instagram: React.FC<ISocialMedia> = ({ type }) => {
  return (
    <Icon
      href={urls.external.polaSocialMedia.instagram.href}
      img={type === 'filled' ? InstagramIconFill : InstagramIcon}
    />
  );
};

export const Twitter: React.FC<ISocialMedia> = ({ type }) => {
  return (
    <Icon href={urls.external.polaSocialMedia.twitter.href} img={type === 'filled' ? TwitterIconFill : TwitterIcon} />
  );
};
