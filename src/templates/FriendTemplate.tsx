import { graphql } from 'gatsby';
import React from 'react';
import FriendPage from '../components/friends/FriendPage';

interface IFriendTemplate {
  pageContext: any;
  data: any;
}


const FriendTemplate: React.FC<IFriendTemplate> = ({ pageContext, data }) => (
  <FriendPage
    id={data.post.id}
    name={data.post.name}
    image={data.post.image.base}
    description={data.post.description}
    page={data.post.page}
  />
)

export default FriendTemplate;

export const postQuery = graphql`
  query FriendBySlug($slug: String!) {
    post: logosFriendsYaml(slug: { eq: $slug }) {
      id
      name
      description
      image {
        base
      }
      page
    }
  }
`;