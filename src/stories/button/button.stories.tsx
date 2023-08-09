import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button/button';

import { Default } from './defaultTest';
import { FocusTest } from './focusTest';
import { DisabledTest } from './disabledTest';
import { ClickTest } from './clickTest';
import { ColorTest } from './colorTest';
import { IconTest } from './iconTest';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    endIcon: {
      control: false,
    },
    children: {
      table: {
        disable: true,
      },
    },
    prefixCls: {
      control: false,
    },
    rippleColor: {
      control: false,
    },
    startIcon: {
      control: false,
    },
    style: {
      control: false,
    },
    tabindex: {
      table: {
        disable: true,
      },
    },
    onClick: {
      action: '点击'
    },
  },
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst'
    }
  },
};

export default meta;
export type ButtonStory = StoryObj<typeof Button>;

export {
  Default,
  ColorTest,
  DisabledTest,
  FocusTest,
  IconTest,
  ClickTest
};
