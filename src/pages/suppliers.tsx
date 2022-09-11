import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { color, margin } from '../styles/theme';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import Placeholder from '../components/Placeholder';
import { graphql, useStaticQuery } from 'gatsby';
import { PageSection } from 'layout/PageSection';
import { InquiryQuestion, ISuppliersData } from 'suppliers';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';

const InquiryContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const InquiryQuestionContainer = styled.div`
  border-left: ${margin.small} solid ${color.text.red};
  padding-left: ${margin.normal};
  margin-bottom: ${margin.big};
`;

const InquiryOptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;

    .container {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ .checkmark {
          background-color: #2196f3;
        }

        &:checked ~ .checkmark:after {
          display: block;
        }
      }

      .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }

      &:hover input ~ .checkmark {
        background-color: #ccc;
      }
    }

    /* Create a custom radio button */
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 50%;

      &:after {
        content: '';
        position: absolute;
        display: none;
      }
    }
  }
`;

interface ISuppliersPage {
  location?: Location;
  inquiryQuestions: InquiryQuestion[];

  onLoadSuppliers: (data: ISuppliersData) => void;
  onSelectSupplier: (questionId: string, selectedOptionId: string) => void;
}

const SuppliersPage = (props: ISuppliersPage) => {
  const { location, inquiryQuestions, onLoadSuppliers, onSelectSupplier } = props;
  const dispatch = useDispatch();

  const data = useStaticQuery(graphql`
    {
      suppliersJson {
        categories {
          categoryId
          header
          suppliers {
            name
            score
          }
          order
        }
      }
    }
  `);

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.SUPPLIERS));
    }
    console.log('suppliers', data);
    onLoadSuppliers(data.suppliersJson);
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Przykładowy formularz dostawców" />
      <Placeholder text="Strona w budowie" />
      <PageSection>
        <InquiryContainer className="suppliers-inquiry">
          {inquiryQuestions
            .sort((x) => x.order)
            .map((question) => (
              <InquiryQuestionContainer className="suppliers-category" key={question.questionId}>
                <header>{question.text}</header>
                <InquiryOptionsList>
                  {question.options.map((option) => (
                    <li key={option.optionId}>
                      <label className="container">
                        <input
                          type="radio"
                          name="radio"
                          onChange={(e) => {
                            console.log(e.currentTarget.checked, option.text, option.optionId);
                            onSelectSupplier(question.questionId, option.optionId);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span>{`${option.text} (${option.score.value})`}</span>
                      </label>
                    </li>
                  ))}
                </InquiryOptionsList>
              </InquiryQuestionContainer>
            ))}
        </InquiryContainer>
      </PageSection>
    </PageLayout>
  );
};

export default connect(
  (state: IPolaState) => {
    const { app, suppliers } = state;
    return {
      inquiryQuestions: suppliers.status !== SuppliersFormStatus.INITIAL ? suppliers.questions : [],
    };
  },
  {
    onLoadSuppliers: suppliersDispatcher.loadFormData,
    onSelectSupplier: suppliersDispatcher.selectMainSupplier,
  }
)(SuppliersPage);
