import { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../components/textField/textField';

import { DefaultTest } from '../test/textFiled/textFieldDefaultTest';
import { ControlledTest } from '../test/textFiled/textFieldControlledTest';
import { FocusTest } from '../test/textFiled/textFieldFocusTest';
import { DisabledTest } from '../test/textFiled/textFieldDisabledTest';
import { UnControlledTest } from '../test/textFiled/textFieldUnControlledTest';
import { WithFormTest } from '../test/textFiled/textFieldWithFormTest';
import { PasswordTest } from '../test/textFiled/textFieldPassword';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {
    value: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    onChange: {
      control: false,
    },
    prefixCls: {
      table: {
        disable: true,
      },
    },
    controlType: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
        expanded: true,
        sort: "requiredFirst",
    },
},
} as Meta<typeof TextField>;

export type TextFiledStory = StoryObj<typeof TextField>;

export const Default = DefaultTest;

export const Disabled = DisabledTest;

export const Controlled = ControlledTest;

export const Focus = FocusTest;

export const Password = PasswordTest;

export const UnControlled = {
  name:'Uncontrolled',
  ...UnControlledTest
};

export const WithForm = WithFormTest;


