import React from "react";
import PropTypes from "prop-types";
import Post from "../components/post";
import { graphql } from 'gatsby'

class PostTemplate extends React.Component {

  render() {
    const { data, pageContext } = this.props;

    return (
      <div>
        <Post post={data.post} slug={pageContext.slug} />
      </div>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
  }
`;