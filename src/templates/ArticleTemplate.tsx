import React from "react";
import { graphql, StaticQuery } from 'gatsby'
import Art from "../components/post/Art";
import { IArticle } from './../domain/articles';

const renderArticles = (articles?: IArticle[]) => {
    return (
      <Art articles={articles}/>
    );
}

interface ArticleTemplate {
  count?: number 
}

const ArticleTemplate: React.FC<ArticleTemplate>= ({count}) => {
  return (
    <StaticQuery
      query={graphql`
      query AllPost {
        allMarkdownRemark {
          nodes {
            html
            id
            htmlAst
            frontmatter {
              subTitle
              title
              cover {
                childImageSharp {
                  resize(width: 300) {
                    src
                  }
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              prefix
            }
          }
        }
      }
      `}
      render={data => {
        const articles : IArticle[] = [];
        const nodes = data.allMarkdownRemark.nodes;
        nodes.map((el: any) => {
          articles.push({
            id: el.id,
            title: el.frontmatter.title,
            content: el.html,
            date: el.fields.prefix,
            fluid: el.frontmatter.cover.childImageSharp.fluid,
          })
        });
        articles.sort((a,b) => {
          if(b.date && a.date){
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } else{
            return 0;
          }      
        });
        if(count){
          return renderArticles(
            count > 0 
            ? articles.slice(0, count < articles.length ? count: articles.length)
            : articles
          );
        } else {
          return renderArticles(articles);
        }
      }}
    />
  );
};

export default ArticleTemplate;
