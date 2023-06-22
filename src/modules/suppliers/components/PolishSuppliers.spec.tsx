import { QuestionBuilder } from '../tests/question-builder';
import { render, screen } from '@testing-library/react';
import 'jest';
import 'jest-expect-message';

import React from 'react';

import { guid } from '@Utils/data/random-number';

import { PolishSuppliers } from './PolishSuppliers';

describe('Polish Suppliers', () => {
  let questionBuilders: { [key: string]: QuestionBuilder };

  beforeEach(() => {
    questionBuilders = {
      ['question A']: new QuestionBuilder('question A', 'First question with selected option').withOptions([
        { text: 'option A.1', score: 30 },
        { text: 'option A.2', score: 80 },
        { text: 'option A.3', score: 40 },
        { text: 'option A.4', score: 100 },
      ]),
      ['question B']: new QuestionBuilder('question B', 'Second question with selected option').withOptions([
        { text: 'option B.1', score: 100 },
        { text: 'option B.2', score: 90 },
      ]),
      ['question C']: new QuestionBuilder('question C', 'Third question with selected option').withOptions([
        { text: 'option C.1', score: 70 },
        { text: 'option C.2', score: 56 },
        { text: 'option C.3', score: 22 },
      ]),
      ['question D']: new QuestionBuilder('question D', 'Question without selected option').withOptions([
        { text: 'option D.1', score: 10 },
      ]),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when value is number', () => {
    test('should show correct value with unit and progress bar', () => {
      // given
      const questions = [
        questionBuilders['question A'].withSelected('option A.2').build(),
        questionBuilders['question B'].withSelected('option B.2').build(),
        questionBuilders['question C'].withSelected('option C.1').build(),
        questionBuilders['question D'].build(),
      ];

      // when
      const surveyComponent = render(
        <PolishSuppliers
          title="test title"
          description={{
            raw: 'test',
            references: [],
          }}
          messages={{
            resultHeader: '',
            countButtonText: '',
            submitButtonText: '',
          }}
          questions={questions}
          onSelectSupplier={(questionId: guid, selectedOptionId: guid) => {}}
          onSelectNew={(questionId: guid) => {}}
          onUpdateNew={(questionId: guid, optionName: string) => {}}
          onSelectNone={(questionId: guid) => {}}
          onCalculate={() => {}}
          onToggleExpand={(questionId: guid, expanded: boolean) => {}}
        />
      );
      const valueBar = screen.findByTestId('value-belt');

      // then
      expect(surveyComponent.getByText('50 %'), 'incorrect label').toBeTruthy();
      valueBar.then((element) => {
        expect(getComputedStyle(element).width, 'incorrect value width').toBe('50%');
      });
    });
  });
});
