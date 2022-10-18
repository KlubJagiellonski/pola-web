import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { ArrayParam, useQueryParams, withDefault } from 'use-query-params';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { TagButton } from '@Components/buttons/TagButton';

import { tagUrl } from './url-service';

interface ITag {
  label?: string;
  active?: boolean;
}

interface IQuery {
  tags: string[];
}

const Tag: React.FC<ITag> = ({ label, active }) => {
  const [query] = useQueryParams<IQuery>({ tags: withDefault(ArrayParam, []) });
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (label) {
      setUrl(tagUrl(label, query));
    }
  }, [label]);

  const flavor = active ? ButtonFlavor.GRAY : ButtonFlavor.LIGHT_GRAY;
  const styles = ButtonThemes[flavor];

  return (
    <Link to={url}>
      <TagButton label={label} styles={styles} />
    </Link>
  );
};

export default Tag;
