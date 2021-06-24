import React from "react";
import { dateToString } from "../../utils/date/date";
import { ResponsiveImage } from "../responsive-image";
import { IArticle } from './../../domain/articles';

interface IArticlesList {
  articles?: IArticle[];
}

const Content = (props: any) => {
    const { content, children } = props;
  
    if (content) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
      return <div>{children}</div>;
    }
  };

const Art: React.FC<IArticlesList> = ({articles}) => {

  React.useEffect(() => {
    console.log(articles);
  }, []);

  return (
    <div>
      {articles && articles[0].content}
      {/* {articles && articles[0].image && <img src={articles[0].image}/>} */}
      {articles && dateToString(new Date(articles[0].date ? articles[0].date : ''))
      }
      {/* <Content content={articles && articles[0].content}/> */}
    </div>
  );
};

export default Art;