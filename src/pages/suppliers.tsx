import { ISuppliersInquiryMessages } from 'suppliers';
import { SuppliersInquiry } from 'suppliers/components/SuppliersInquiry';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';

import { graphql, useStaticQuery } from 'gatsby';
import { Placeholder } from 'gatsby-plugin-image';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from '@App/website';

import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

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
    messages,
    inquiryQuestions,
    totalScore,

    onLoadSuppliers,
    onSelectSupplier,
    onSelectNew,
    onSelectNone,
    calculateTotalScore,
  } = props;

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
    onLoadSuppliers(data.suppliersJson);
  }, []);

  return (
    <PageLayout location={props.location} page={PageType.SUPPLIERS}>
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
