import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import Placeholder from '../components/Placeholder';
import { graphql, useStaticQuery } from 'gatsby';
import { PageSection } from 'layout/PageSection';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';
import { SuppliersInquiry } from 'suppliers/components/SuppliersInquiry';
import { ISuppliersInquiryMessages } from 'suppliers';

const connector = connect(
  (state: IPolaState) => {
    const { suppliers } = state;

    switch (suppliers.status) {
      case SuppliersFormStatus.LOADED:
        return {
          messages: suppliers.messages,
          inquiryQuestions: suppliers.questions,
          isResultVisible: suppliers.isResultDialogVisible,
        };
      case SuppliersFormStatus.CALCULATED:
        return {
          messages: suppliers.messages,
          inquiryQuestions: suppliers.questions,
          totalScore: suppliers.totalScore,
          resultMessage: suppliers.resultMessage,
          isResultVisible: suppliers.isResultDialogVisible,
        };
      case SuppliersFormStatus.INITIAL:
      default:
        return {
          inquiryQuestions: [],
        };
    }
  },
  {
    onLoadSuppliers: suppliersDispatcher.loadFormData,
    onSelectSupplier: suppliersDispatcher.selectMainSupplier,
    onSelectNew: suppliersDispatcher.proposeNewSupplier,
    onSelectNone: suppliersDispatcher.unselectSupplier,
    calculateTotalScore: suppliersDispatcher.calculateTotalScore,
    showResultDialog: suppliersDispatcher.showDialog,
    hideResultDialog: suppliersDispatcher.hideDialog,
    submitResult: suppliersDispatcher.submitForm,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ISuppliersPage = ReduxProps & {
  location?: Location;
};

const SuppliersPage = (props: ISuppliersPage) => {
  const {
    location,
    messages,
    inquiryQuestions,
    totalScore,

    onLoadSuppliers,
    onSelectSupplier,
    onSelectNew,
    onSelectNone,
    calculateTotalScore,
  } = props;
  const dispatch = useDispatch();

  const data = useStaticQuery(graphql`
    {
      suppliersJson {
        messages {
          entryHeader
          resultHeader
          countButtonText
          submitButtonText
        }
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
        <SuppliersInquiry
          messages={messages || ({} as ISuppliersInquiryMessages)}
          questions={inquiryQuestions}
          onSelectSupplier={onSelectSupplier}
          onSelectNew={onSelectNew}
          onSelectNone={onSelectNone}
          onCalculate={calculateTotalScore}
        />
      </PageSection>
    </PageLayout>
  );
};

export default connector(SuppliersPage);
