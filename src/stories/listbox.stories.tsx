import { Meta, StoryObj } from '@storybook/react-vite';

import { Listbox } from '../components/listbox/listbox';

import { GetListItemTest } from '../test/listbox/getListItemTest';
import { DefaultTest } from '../test/listbox/listDefaultTest';
import { MultiTest } from '../test/listbox/listMultiTest';
import { MultiValueNotArrayTest } from '../test/listbox/listMultiValueNotArrayTest';
import { ControlledTest } from '../test/listbox/listboxControledlTest';
import { FocusEmptyItemsTest } from '../test/listbox/listboxFocusEmptyItemsTest';
import { ListboxKeyboardTest } from '../test/listbox/listboxKeyboardTest';
import { MultiUnControlledTest } from '../test/listbox/listboxMultiUnControlledTest';
import { SelectAllTest } from '../test/listbox/listboxSelectAllTest';
import { UnControlledTest } from '../test/listbox/listboxUnControlledTest';
import { UndefinedTest } from '../test/listbox/listboxValueUndefinedTest';

const meta: Meta<typeof Listbox> = {
  title: 'Example/Listbox',
  component: Listbox,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    prefixCls: {
      control: false,
    },
    style: {
      control: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};

export default meta;
export type ListboxStory = StoryObj<typeof Listbox>;

export const Default = DefaultTest;
export const Controlled = ControlledTest;
export const UnControlled = UnControlledTest;
export const Keyboard = ListboxKeyboardTest;
export const MultiSelection = MultiTest;
export const MultiUnControlled = MultiUnControlledTest;
export const MultiValueNotArray = {
  name: 'Value is not array with multi mode',
  ...MultiValueNotArrayTest,
};

export const SelectAll = SelectAllTest;

export const Undefined = {
  name: 'Without value and defaultValue',
  ...UndefinedTest,
};

export const GetListItem = GetListItemTest;

export const FocusEmptyItems = {
  name: 'Focus with Empty Items',
  ...FocusEmptyItemsTest,
};
