import { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../components/textField/textField';

import { DefaultTest } from '../test/textFiled/textFieldDefaultTest';
import { ValueTest } from '../test/textFiled/textFieldValueTest';
import { FocusTest } from '../test/textFiled/textFieldFocusTest';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {
    prefixCls: {
      control: false,
    },
    color: {
      control: false,
    }
  },

} as Meta<typeof TextField>;

export type TextFiledStory = StoryObj<typeof TextField>;

export const Default = DefaultTest;

export const Value = ValueTest;

export const Focus = FocusTest;
