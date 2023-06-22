import type { Meta, StoryObj } from '@storybook/react';

import { ScoreBar } from './ScoreBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ScoreBar> = {
  title: 'Example/ScoreBar',
  component: ScoreBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    missingValuePlaceholder: { text: 'placeholder' },
    unit: { text: 'unit' },
    value: { value: 'value' },
  },
};

export default meta;
type Story = StoryObj<typeof ScoreBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    missingValuePlaceholder: 'primary',
    unit: 'cm',
    value: 100,
  },
};

export const Secondary: Story = {
  args: {
    missingValuePlaceholder: 'secondary',
    unit: 'cm',
    value: 44,
  },
};

export const Large: Story = {
  args: {
    missingValuePlaceholder: 'large',
    unit: '0000',
    value: 54,
  },
};

export const Small: Story = {
  args: {
    missingValuePlaceholder: 'small',
    unit: 'asdfsfsdf',
    value: 2,
  },
};
