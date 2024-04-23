import { IGatsbyNode } from "@App/generics";

export interface IMaterial extends IGatsbyNode {
  id: string;
  name: string;
  description: {
    childMarkdownRemark: {
      html: string;
    };
  };
  prevImage: {
    url: string;
    title: string;
  };
  file: {
    url: string;
  };
}
