import React, { useState } from 'react'
import { WrapperTitle, Title, ToolTip } from './ModalTitle.css'
import ModalIcon from './ModalIcon'
import { FaTimesCircle } from 'react-icons/fa'
import { RiFileCopyLine } from 'react-icons/ri'

const SearchModalTitle = ({ title, close }) => {
  const [toolTipOpen, isToolTipOpen] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(window.location);
    isToolTipOpen(true);
    setTimeout(function() {
      isToolTipOpen(false);
    }, 1000);
  }

  return (
    <WrapperTitle>
      <ModalIcon Icon={FaTimesCircle} onClick={close} />
      <Title>
        {title}
      </Title>
      <div style={{ position: 'relative' }}>
        {toolTipOpen && <ToolTip>skopiowałeś link</ToolTip>}
        <ModalIcon Icon={RiFileCopyLine} onClick={handleClick} />
      </div>
    </WrapperTitle>
  )
}

export default SearchModalTitle;
