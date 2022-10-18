import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import { Friend } from '@Domain/friends';

import { getFriendBySlug } from '@Utils/friends';

import Friends from './Friends';
import SingleFriend from './SingleFriend';

import { Device, margin } from '@Styles/theme';

const Wrapper = styled.div`
  margin: ${margin.small} 0;

  .friends_wrapper {
    .friends_title {
      display: none;
    }
  }

  @media ${Device.mobile} {
    margin: ${margin.small} 0;
  }
`;
interface IFriendsSection {
  friends?: Friend[];
}

const FriendsSection: React.FC<IFriendsSection> = ({ friends }) => {
  const [query] = useQueryParams({
    value: StringParam,
  });
  const [friend, setFriend] = useState<Friend>();

  useEffect(() => {
    if (friends && query.value) {
      const friend = getFriendBySlug(query.value, friends);
      if (friend != undefined) {
        setFriend(friend);
      }
    }
  }, [friends, query]);

  return (
    <Wrapper id="friend">
      <Friends friends={friends} />
      {friend && friends && <SingleFriend {...friend} />}
    </Wrapper>
  );
};

export default FriendsSection;
