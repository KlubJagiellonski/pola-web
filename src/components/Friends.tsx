import React from 'react';
import { Wrapper, ImageWrapper, FriendsSlider, Image } from './Friends.css';
import { TitleSection } from '../styles/GlobalStyle.css';
import { color } from '../styles/theme';
import { IFriend } from '../domain/friends';

interface IFriends {
  friends?: IFriend[];
}

const Friends: React.FC<IFriends> = ({ friends }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    adaptiveHeight: true,
    slidesToScroll: 5,
    arrows: false,
    responsive: [
      {
        breakpoint: 1272,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ]
  }

  return (
    <Wrapper color={color.primary}>
      <TitleSection>Przyjaciele Poli</TitleSection>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {friends &&
          <ImageWrapper>
            <FriendsSlider {...settings}>
              {friends.map((el, id) => (
                <div key={`friend_${id}`}>
                  <Image>
                    {el.image && <img src={require('./../assets/'+el.image)}/>}
                  </Image>
                </div>
              ))}
            </FriendsSlider>
        </ImageWrapper>}
      </div>
    </Wrapper>
  );
};

export default Friends;
