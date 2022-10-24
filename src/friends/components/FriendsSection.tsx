import { useLocation } from '@reach/router';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import React, { useEffect } from 'react';
import { useState } from 'react';

import { FriendData } from '@Domain/friends';

import { getFriendBySlug } from 'friends/services/friend-service';

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
  friends?: FriendData[];
}

const FriendsSection: React.FC<IFriendsSection> = ({ friends }) => {
  const location = useLocation();
  const [query] = useQueryParams({
    value: StringParam,
  });
  const [friend, setFriend] = useState<FriendData>();

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
