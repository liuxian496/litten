import { Meta, StoryObj } from '@storybook/react-vite';

import { Summary } from '../components/summary/summary';

import { Default as DefaultTest } from '../test/summary/summaryDefaultTest';

export default {
  title: 'Example/Summary',
  component: Summary,
  argTypes: {
    prefixCls: {
      control: false,
    },
    color: {
      control: false,
    },
  },
} as Meta<typeof Summary>;

export type SummaryStory = StoryObj<typeof Summary>;

export const Default: SummaryStory = {
  name: 'Default',
  ...DefaultTest,
};
