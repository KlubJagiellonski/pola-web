import data from '../modules/suppliers/content/suppliers.json';
import { ISuppliersState, SuppliersFormStatus, SuppliersInquiryData } from 'modules/suppliers';
import { InquiryResultModal } from 'modules/suppliers/components/InquiryResultModal';
import { SuppliersInquiry } from 'modules/suppliers/components/SuppliersInquiry';
import { suppliersReducer } from 'modules/suppliers/suppliers-reducer';
import { calculateTotalScore } from 'modules/suppliers/suppliers-service';

import * as React from 'react';

import { GatsbyPage } from '@App/generics';
import { PageType } from '@App/website';

import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { guid } from '@Utils/data/random-number';

export interface ISuppliersInquiryPage extends GatsbyPage {}

const SuppliersInquiryPage = (props: ISuppliersInquiryPage) => {
  console.log('Hello');

  const inquiry: SuppliersInquiryData = new SuppliersInquiryData(data.categories, data.messages);
  const initialState: ISuppliersState = {
    status: SuppliersFormStatus.LOADED,
    messages: inquiry.messages,
    questions: inquiry.questions,
  };

  const [isResultVisible, setResultVisible] = React.useState(false);
  const [inquiryState, dispatch] = React.useReducer(suppliersReducer, initialState);

  const handleSelect = (questionId: guid, selectedOptionId: guid) => {
    dispatch({ type: 'selectMain', payload: { questionId, selectedOptionId } });
  };

  const handleCalculate = () => {
    const calculationResult = calculateTotalScore(inquiryState.questions);
    dispatch({ type: 'calculate', payload: calculationResult });
    setResultVisible(true);
  };

  const handleUnselect = (questionId: guid) => {
    dispatch({ type: 'unselect', payload: { questionId } });
  };

  const handleSelectNew = (questionId: guid) => {
    dispatch({ type: 'proposeNewSupplier', payload: { questionId } });
  };

  const handleUpdateNew = (questionId: guid, newSupplierName: string) => {
    dispatch({ type: 'updateSupplierName', payload: { questionId, newSupplierName } });
  };

  const handleSubmit = () => {
    console.warn('submitting form is not implemented');
  };

  const hideDialog = () => {
    setResultVisible(false);
  };

  const handleQuestionExpand = (questionId: guid, expanded: boolean) => {
    dispatch({ type: 'toggleExpand', payload: { questionId, expanded } });
  };

  return (
    <PageLayout location={props.location} page={PageType.SUPPLIERS} styles={{ marginTop: '4em' }}>
      <SEOMetadata pageTitle="Ankieta" />
      <PageSection>
        <div></div>
        {isResultVisible && inquiryState.status !== SuppliersFormStatus.LOADED && (
          <InquiryResultModal
            totalScore={inquiryState.totalScore}
            messages={inquiryState.messages}
            onClose={hideDialog}
            onSubmit={handleSubmit}
          />
        )}
        <SuppliersInquiry
          messages={inquiryState.messages}
          questions={inquiryState.questions}
          onCalculate={handleCalculate}
          onSelectNew={handleSelectNew}
          onUpdateNew={handleUpdateNew}
          onSelectNone={handleUnselect}
          onSelectSupplier={handleSelect}
          onToggleExpand={handleQuestionExpand}
        />
      </PageSection>
    </PageLayout>
  );
};

export default SuppliersInquiryPage;
