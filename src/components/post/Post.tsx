import React from "react";
import PropTypes from "prop-types";


const PostFooter = ({}) => {
    return (
      <footer>
        {/* <PostShare post={post} slug={slug} />
        <PostAuthor author={author} /> */}
        {/* <PostComments post={post} slug={slug} facebook={facebook} /> */}
      </footer>
    );
  };

PostFooter.propTypes = {

};

const Article = (props: any) => {
    const { children } = props;
    return (
        <div>{children}</div>
    )
}

const Content = (props: any) => {
    const { html, children } = props;
  
    if (html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else {
      return <div>{children}</div>;
    }
  };

const PostHeader: React.FC<any> = (props: any) => {
    const { title, subTitle, date } = props;

    function myDate(dateString: any) {
        const dateObj = new Date(dateString).toUTCString();
        const dateToShow = dateObj
        .split(" ")
        .slice(0, 4)
        .join(" ");

        return dateToShow;
    }

    return (
        <header>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
        <div>{myDate(date)}</div>
        </header>
    );
};

PostHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    date: PropTypes.string.isRequired
};

const Post: React.FC<any> = (props: any) => {
  const { post, author, slug, facebook } = props;
  const title = ((post || {}).frontmatter || {}).title;
  const subTitle = ((post || {}).frontmatter || {}).subTitle;
  const date = ((post || {}).fields || {}).prefix;
  const html = (post || {}).html;

  return (
    <Article>
      <PostHeader title={title} subTitle={subTitle} date={date} />
      <Content html={html} />
      <PostFooter />
    </Article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default Post;