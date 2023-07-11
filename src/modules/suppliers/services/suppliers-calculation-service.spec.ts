import { QuestionBuilder } from '../tests/question-builder';
import 'jest';
import 'jest-expect-message';

import React from 'react';

import { calculateSuppliersSurvey } from './suppliers-calculation-service';

describe('Suppliers survey calculation service', () => {
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
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should show correct calculation for three selected question', () => {
    // given
    const questions = [
      questionBuilders['question A'].withSelected('option A.2').build(),
      questionBuilders['question B'].withSelected('option B.2').build(),
      questionBuilders['question C'].withSelected('option C.1').build(),
      questionBuilders['question D'].build(),
    ];

    // when
    var result = calculateSuppliersSurvey(questions);

    // then
    expect(result.type).toBe('scored');
    expect(result.score).toBe((80 + 90 + 70) / 3);
  });

  test('should show error message when only two options are selected', () => {
    // given
    const questions = [
      questionBuilders['question A'].withSelected('option A.2').build(),
      questionBuilders['question B'].withSelected('option B.2').build(),
      questionBuilders['question C'].build(),
      questionBuilders['question D'].build(),
    ];

    // when
    var result = calculateSuppliersSurvey(questions);

    // then
    expect(result.type).toBe('not-enough');
    expect(result.score).toBeUndefined;
  });

  test('should show manual calculation message if a "new" option selected in at least one question', () => {
    // given
    const questions = [
      questionBuilders['question A'].withNewOptionSelected().build(),
      questionBuilders['question B'].withSelected('option B.2').build(),
      questionBuilders['question C'].withSelected('option C.1').build(),
      questionBuilders['question D'].withSelected('option D.1').build(),
    ];

    // when
    var result = calculateSuppliersSurvey(questions);

    // then
    expect(result.type).toBe('custom-option');
    expect(result.score).toBeUndefined;
  });
});
