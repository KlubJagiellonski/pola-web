import data from '../modules/suppliers/content/suppliers.json';
import { ISuppliersState, SuppliersFormStatus, SuppliersSurveyData } from 'modules/suppliers';
import { SuppliersSurvey } from 'modules/suppliers/components/SuppliersSurvey';
import { calculateTotalScore } from 'modules/suppliers/services/survey-calc-service';
import { SurveyService } from 'modules/suppliers/services/survey-service';
import { suppliersReducer } from 'modules/suppliers/state/suppliers-reducer';
import { showSurveyResults } from 'modules/suppliers/state/survey-result-reducer';

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
  // try {
  const result = SurveyService.getAll();
  //   } catch (error: unknown) {
  //     logError(error, 'Cannot load articles data');
  //   }

  console.log('survey data:', result);
  const survey: SuppliersSurveyData = new SuppliersSurveyData(result.questions);
  const initialState: ISuppliersState = {
    status: SuppliersFormStatus.LOADED,
    messages: {
      countButtonText: 'count button',
      entryHeader: 'entry header',
      resultHeader: 'result header',
      submitButtonText: 'submit button text',
      automaticCalculationMessage: result.automaticCalculationMessage.raw,
      manualCalculationMessage: result.manualCalculationMessage.raw,
      invalidOptionsMessage: result.invalidOptionsMessage.raw,
    },
    questions: survey.questions,
  };

  const [surveyState, dispatch] = React.useReducer(suppliersReducer, initialState);
  const dis = useDispatch();
  const handleSelect = (questionId: guid, selectedOptionId: guid) => {
    dispatch({ type: 'selectMain', payload: { questionId, selectedOptionId } });
  };

  const handleCalculate = async () => {
    const calculationResult = calculateTotalScore(surveyState.questions);
    dispatch({ type: 'calculate', payload: calculationResult });

    await dis(
      showSurveyResults({
        messages: surveyState.messages,
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
        <SuppliersSurvey
          title={result.title}
          description={result.description}
          messages={surveyState.messages}
          questions={surveyState.questions}
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
