import React from 'react';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { TagButton } from '@Components/buttons/TagButton';

interface ITag {
  label?: string;
  active?: boolean;
  onClick: () => void;
}

const Tag: React.FC<ITag> = ({ label, active, onClick }) => {
  const flavor = active ? ButtonFlavor.GRAY : ButtonFlavor.LIGHT_GRAY;
  const styles = ButtonThemes[flavor];

  return <TagButton label={label} styles={styles} onClick={onClick} />;
};

export default Tag;
