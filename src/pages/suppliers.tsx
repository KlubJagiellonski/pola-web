import data from '../modules/suppliers/content/suppliers.json';
import { ISuppliersState, SuppliersFormStatus, SuppliersInquiryData } from 'modules/suppliers';
import { SuppliersInquiry } from 'modules/suppliers/components/SuppliersInquiry';
import { calculateTotalScore } from 'modules/suppliers/inquiry-calc-service';
import { showInquiryResults } from 'modules/suppliers/state/inquiry-result-reducer';
import { suppliersReducer } from 'modules/suppliers/state/suppliers-reducer';

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { GatsbyPage } from '@App/generics';
import { PageType } from '@App/website';

import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { guid } from '@Utils/data/random-number';

export interface ISuppliersInquiryPage extends GatsbyPage {}

const SuppliersInquiryPage = (props: ISuppliersInquiryPage) => {
  const inquiry: SuppliersInquiryData = new SuppliersInquiryData(data.categories, data.messages);
  const initialState: ISuppliersState = {
    status: SuppliersFormStatus.LOADED,
    messages: inquiry.messages,
    questions: inquiry.questions,
  };

  const [inquiryState, dispatch] = React.useReducer(suppliersReducer, initialState);
  const dis = useDispatch();
  const handleSelect = (questionId: guid, selectedOptionId: guid) => {
    dispatch({ type: 'selectMain', payload: { questionId, selectedOptionId } });
  };

  const handleCalculate = async () => {
    const calculationResult = calculateTotalScore(inquiryState.questions);
    dispatch({ type: 'calculate', payload: calculationResult });

    await dis(
      showInquiryResults({
        messages: inquiryState.messages,
        totalScore: calculationResult,
      })
    );
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

  const handleQuestionExpand = (questionId: guid, expanded: boolean) => {
    dispatch({ type: 'toggleExpand', payload: { questionId, expanded } });
  };

  return (
    <PageLayout location={props.location} page={PageType.SUPPLIERS} styles={{ marginTop: '4em' }}>
      <SEOMetadata pageTitle="Ankieta" />
      <PageSection>
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
