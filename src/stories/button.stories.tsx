import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/button/button';

import { Default } from '../test/button/default.test'
import { FocusTest } from '../test/button/focus.test';
import { DisabledTest } from '../test/button/disabled.test';
import { ClickTest } from '../test/button/click.test';
import { ColorTest } from '../test/button/color.test';
import { IconTest } from '../test/button/icon.test';

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
