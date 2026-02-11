import { Meta, StoryObj } from "@storybook/react";

import { Radio } from "../components/radio/radio";

import { ColorTest } from "../test/radio/radioColorTest";
import { DefaultTest } from "../test/radio/radioDefaultTest";
import { RadioGroupTest } from "../test/radio/radioGroupTest";
import { SizeTest } from "../test/radio/radioSizeTest";
import { StandaloneRadioTest } from "../test/radio/standaloneRadioTest";

const meta: Meta<typeof Radio> = {
  title: "Example/Radio",
  component: Radio,
  argTypes: {
    "aria-label": {
      table: {
        disable: true,
      },
    },
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
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    onChange: {
      control: false,
    },
    // onChange: {
    //     action: 'checked change'
    // },
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};

export default meta;

export type RadioStory = StoryObj<typeof Radio>;

export const Default = DefaultTest;
export const Color = ColorTest;
export const Size = SizeTest;
export const StandaloneRadio = StandaloneRadioTest;
export const RadioGroup = RadioGroupTest;
