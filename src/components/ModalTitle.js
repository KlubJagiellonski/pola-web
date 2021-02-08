import React from 'react'
import { WrapperTitle, Title} from './ModalTitle.css'
import ModalIcon from './ModalIcon'
import { FaTimesCircle } from 'react-icons/fa'
import { RiFileCopyLine } from 'react-icons/ri'

const SearchModalTitle = ({ title, close }) => {

  const handleClick = () => {
    navigator.clipboard.writeText(window.location);
  }

  return (
    <WrapperTitle>
      <ModalIcon Icon={FaTimesCircle} ariaLabel="Wyłącz" onClick={close} />
      <Title>
        {title}
      </Title>
      <div style={{ position: 'relative' }}>
        <ModalIcon Icon={RiFileCopyLine} onClick={handleClick} />
      </div>
    </WrapperTitle>
  )
}

export default SearchModalTitle;
