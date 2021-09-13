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
  answer: string,
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
        <p>
          {answer}
        </p>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

export default SingleAccordion;