import { PolishSuppliers } from 'modules/suppliers/components/PolishSuppliers';
import { SuppliersSurvey } from 'modules/suppliers/domain/supplier-survey';
import { ISupplierSurveyState, SurveyStatus } from 'modules/suppliers/domain/supplier-survey-state';
import {
  ISurveyCalculationResult,
  calculateSuppliersSurvey,
} from 'modules/suppliers/services/suppliers-calculation-service';
import { SurveyService } from 'modules/suppliers/services/survey-service';
import { suppliersReducer } from 'modules/suppliers/state/suppliers-reducer';
import { showSurveyResults } from 'modules/suppliers/state/survey-result-reducer';

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { PageType } from '@App/website';

import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { guid } from '@Utils/data/random-number';
import {PageProps} from "gatsby";

export interface ISuppliersInquiryPage extends PageProps<any> {}

const SuppliersInquiryPage = (props: ISuppliersInquiryPage) => {
  const surveys = SurveyService.getAllSurveys();
  const surveyData = surveys.find((survey) => survey !== undefined);
  const messages = surveyData
    ? {
        scored: surveyData.automaticCalculationMessage,
        'custom-option': surveyData.manualCalculationMessage,
        'not-enough': surveyData.invalidOptionsMessage,
      }
    : {};

  const survey: SuppliersSurvey =
    surveyData !== undefined
      ? new SuppliersSurvey(
          surveyData.title,
          surveyData?.description,
          surveyData?.automaticCalculationMessage,
          surveyData?.manualCalculationMessage,
          surveyData?.invalidOptionsMessage,
          surveyData.questions
        )
      : SuppliersSurvey.Empty;

  const initialState: ISupplierSurveyState = {
    status: SurveyStatus.LOADED,
    actionLabels: {
      countButtonText: 'Przelicz ankietę',
      resultHeader: 'Twój wynik',
      submitButtonText: 'Wyślij ankietę',
    },
    survey,
  };

  const [surveyState, dispatchToReducer] = React.useReducer(suppliersReducer, initialState);
  const dispatchToAppState = useDispatch();
  const handleSelect = (questionId: guid, selectedOptionId: guid) => {
    dispatchToReducer({ type: 'selectMain', payload: { questionId, selectedOptionId } });
  };

  const handleCalculate = async () => {
    const calculationResult = calculateSuppliersSurvey(surveyState.survey.categories);

    const result: ISurveyCalculationResult = {
      ...calculationResult,
      message: messages[calculationResult.type] || 'brak treści',
    };
    dispatchToReducer({ type: 'calculate', payload: result });

    await dispatchToAppState(
      showSurveyResults({
        actionLabels: surveyState.actionLabels,
        totalScore: result,
      })
    );
  };

  const handleUnselect = (questionId: guid) => {
    dispatchToReducer({ type: 'unselect', payload: { questionId } });
  };

  const handleSelectNew = (questionId: guid) => {
    dispatchToReducer({ type: 'proposeNewSupplier', payload: { questionId } });
  };

  const handleUpdateNew = (questionId: guid, newSupplierName: string) => {
    dispatchToReducer({ type: 'updateSupplierName', payload: { questionId, newSupplierName } });
  };

  const handleQuestionExpand = (questionId: guid, expanded: boolean) => {
    dispatchToReducer({ type: 'toggleExpand', payload: { questionId, expanded } });
  };

  return (
    <PageLayout location={props.location} page={PageType.SUPPLIERS} styles={{ marginTop: '4em' }}>
      <SEOMetadata pageTitle="Polskie - kupuję to!" />
      <PageSection>
        <PolishSuppliers
          title={surveyState.survey.title}
          description={surveyState.survey.description}
          messages={surveyState.actionLabels}
          questions={surveyState.survey.categories}
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
