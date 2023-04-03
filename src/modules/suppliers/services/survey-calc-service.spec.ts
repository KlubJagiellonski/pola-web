import { CalculationResultType, OptionScore, QuestionOption, SurveyQuestion } from '..';
import 'jest';
import 'jest-expect-message';

import React from 'react';

import { calculateTotalScore } from './survey-calc-service';

function createQuestion(
  questionId: string,
  header: string,
  order: number,
  options: { text: string; score: number }[],
  selectedOptionText?: string
) {
  const question = new SurveyQuestion(header, order, questionId).AddOptions(
    options.map((o) => new QuestionOption(o.text, OptionScore.create(o.score)))
  );
  question.selectedOptionId = !selectedOptionText
    ? undefined
    : question.options.find((o) => o.text === selectedOptionText)?.optionId;
  return question;
}

describe('Inquiry Calculation Service', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('', () => {
    const questions: SurveyQuestion[] = [
      createQuestion(
        'question A',
        'What option of question A',
        1,
        [
          { text: 'option A.1', score: 30 },
          { text: 'option A.2', score: 80 },
          { text: 'option A.3', score: 40 },
          { text: 'option A.4', score: 100 },
        ],
        'option A.2'
      ),
      createQuestion(
        'question B',
        'What option of question B',
        2,
        [
          { text: 'option B.1', score: 100 },
          { text: 'option B.2', score: 90 },
        ],
        'option B.2'
      ),
      createQuestion(
        'question C',
        'What option of question C',
        3,
        [
          { text: 'option C.1', score: 70 },
          { text: 'option C.2', score: 56 },
          { text: 'option C.3', score: 22 },
        ],
        'option C.1'
      ),
    ];

    var result = calculateTotalScore(questions);

    expect(result.type).toBe(CalculationResultType.SCORED);
    expect(result.score?.value).toBe(80);
  });
});
