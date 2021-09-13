import React from 'react'

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import './accordion.css';

interface ISingleAccordion {
  question: string,
  answer: HTMLElement,
  key: number
}

const SingleAccordion: React.FC<ISingleAccordion> = ({ question, answer, key }) => {
  return (
    <AccordionItem key={key}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {question}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {answer}
      </AccordionItemPanel>
    </AccordionItem>
  )
}

export default SingleAccordion;