import React from 'react'
import { Accordion } from 'react-accessible-accordion';
import { urls } from '../../domain/website';

import './accordion.css';
import SingleAccordion from './SingleAccordion';

const faq = [
  {
    question: "Mam telefon z systemem operacyjnym Android. Nie mogę znaleźć aplikacji w Google Play. Dlaczego?",
    answer: <p>Aplikacja Pola działa na telefonach wyposażonych w system Android 4.1 lub nowszy. Aktualnie nie planujemy wsparcia dla wcześniejszych wersji.</p>
  },
  {
    question: "Mam telefon iPhone (iPad). Nie mogę znaleźć aplikacji w App Store. Dlaczego?",
    answer: <p>Aplikacja Pola działa na urządzeniach wyposażonych w system operacyjny iOS w wersji 11.0 lub nowszej. Aktualnie nie planujemy wsparcia dla wcześniejszych wersji.</p>
  },
  {
    question: "Reprezentuję producenta. Moja firma nie została jeszcze zweryfikowana przez redakcję. Co mam zrobić?",
    answer: <p>W pierwszej kolejności zajmujemy się tymi firmami, których produkty są najczęściej skanowane. Jednak możesz nam pomóc w weryfikacji firmy wypełniając <a href={urls.external.form}>formularz</a>.</p>
  },
  {
    question: "Jak mogę zgłosić uwagi lub błąd w serwisie Pola?",
    answer: <p>Korzystamy z serwisu GitHub do zgłaszania błędów i uwag. Wybierz do jakiej części Poli chcesz zgłosić uwagi: <a href={urls.external.githubAndroid}>aplikacja na Androida</a>, <a href={urls.external.githubIos}>aplikacja na iPhone'a</a>, <a href={urls.external.githubWeb}>strona internetowa</a>.</p>
  },
  {
    question: "Chcę pomóc w projekcie",
    answer: <p>Zapraszamy do włączenia się w pracę nad serwisem Pola. Dołącz do nas i pracuj nad <a href={urls.external.githubAndroid}>aplikacją na Androida</a>, <a href={urls.external.githubIos}>aplikacją na iPhone'a</a> lub <a href={urls.external.githubWeb}>stroną internetową</a>. Stale poszukujemy też wolontariuszy chcących pomóc nam rozwijać bazę danych o firmach - zachęcamy do kontaktu z Mateuszem Perowiczem (tel. 660 010 034, e-mail: mateusz.perowicz@klubjagiellonski.pl)</p>
  },
]

const AccordionList = () => {
  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      {faq.map((item, index) =>
        <SingleAccordion question={item.question} answer={item.answer} key={index} />
      )}
    </Accordion>
  )
}

export default AccordionList;