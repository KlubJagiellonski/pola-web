import React from 'react'

import { ButtonColor } from '../../styles/button-theme'
import { fontSize } from '../../styles/theme'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { ArrayParam, useQueryParams, withDefault, encodeQueryParams, QueryParamConfig } from 'use-query-params';
import { urls } from '../../domain/website';
import { navigate } from '@reach/router';
import { stringify } from 'query-string';

interface ITag {
  label?: string;
  active?: boolean
}

interface IQuery {
  tags: string[],
}

const Tag: React.FC<ITag> = ({ label, active }) => {
  const [query] = useQueryParams<IQuery>({ tags: withDefault(ArrayParam, []) });

  const onClick = () => {
    if (label) {
      let tags = query.tags.slice()
      const isTag = tags.find((tag: string) => tag === label);
      if (!isTag) {
        tags.push(label)
      } else {
        tags = tags.filter((tag: string) => tag !== label)
      }
      const encodedQuery = encodeQueryParams({ tags: withDefault(ArrayParam, []) }, { tags });
      navigate(`${urls.pola.news}?${stringify(encodedQuery)}`)
    }
  }

  return (
    <SecondaryButton
      onClick={onClick}
      label={label}
      color={active ? ButtonColor.Gray : ButtonColor.LightGray}
      fontSize={fontSize.small}
    />
  )
}

export default Tag;