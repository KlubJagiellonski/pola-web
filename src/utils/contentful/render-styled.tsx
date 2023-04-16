import { ContentfulRichText } from '.';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';

export function renderStyled(content: ContentfulRichText | string): React.ReactNode {
  return isRichText(content) ? renderRichText(content, options) : content;
}

function isRichText(content: ContentfulRichText | string): content is ContentfulRichText {
  if ((content as ContentfulRichText).raw) {
    return true;
  }
  return false;
}

const options: any = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <b className="font-bold">{text}</b>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      );
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_4]: (node: any, children: any) => {
      return <h4>{children}</h4>;
    },
  },
};
