import { QuestionBuilder } from '../tests/question-builder';
import type { Meta, StoryObj } from '@storybook/react';

import { PolishSuppliers } from './PolishSuppliers';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PolishSuppliers> = {
  title: 'Example/Survey',
  component: PolishSuppliers,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: { test: 'tytuł' },
  },
};

export default meta;
type Story = StoryObj<typeof PolishSuppliers>;

export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    questions: [
      new QuestionBuilder('q1', 'text 1').build(),
      new QuestionBuilder('q1', 'text 1').build(),
      new QuestionBuilder('q1', 'text 1').build(),
    ],
  },
};
