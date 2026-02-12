import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "../components/checkbox/checkbox";

import { CheckedTest } from "../test/checkbox/checkboxCheckedTest";
import { ColorTest } from "../test/checkbox/checkboxColorTest";
import { ControlledTest } from "../test/checkbox/checkboxControlledTest";
import { DefaultTest } from "../test/checkbox/checkboxDefaultTest";
import { DisabledTest } from "../test/checkbox/checkboxDisabledTest";
import { IndeterminateTest } from "../test/checkbox/checkboxIndeterminateTest";
import { SizeTest } from "../test/checkbox/checkboxSizeTest";
import { UnControlledTest } from "../test/checkbox/checkboxUnControlledTest";

const meta: Meta<typeof Checkbox> = {
  title: "Example/Checkbox",
  component: Checkbox,
  argTypes: {
    defaultChecked: {
      control: false,
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    id: {
      control: false,
    },
    prefixCls: {
      control: false,
    },
    rippleColor: {
      control: false,
    },
    style: {
      control: false,
    },
    value: {
      control: false,
    },
    "aria-label": {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
    controlType: {
      table: {
        disable: true,
      },
    },
    onChange: {
      control: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};

export default meta;
export type CheckboxStory = StoryObj<typeof Checkbox>;

export const Default = DefaultTest;

export const Checked = CheckedTest;

export const Color = ColorTest;

export const Controlled = ControlledTest;

export const UnControlled = UnControlledTest;

export const Disabled = DisabledTest;

export const Indeterminate = IndeterminateTest;

export const Size = SizeTest;
