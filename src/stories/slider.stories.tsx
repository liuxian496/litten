import { Meta, StoryObj } from "@storybook/react";

import { Slider } from "../components/slider/slider";

import { DefaultTest } from "../test/slider/sliderDefaultTest";
import { DisabledTest } from "../test/slider/sliderDisabledTest";
import { ControlledTest } from "../test/slider/sliderControlledTest";
import { UnControlledTest } from "../test/slider/sliderUnControlledTest";
import { VerticalTest } from "../test/slider/sliderVerticalTest";
import { WithFormTest } from "../test/slider/sliderWithFormTest";
import { ColorTest } from "../test/slider/sliderColorTest";

export default {
  title: "Example/Slider",
  component: Slider,
  argTypes: {
    defaultValue: {
      control: false,
    },
    id: {
      control: false,
    },
    marks: {
      control: false,
    },
    min: {
      control: false,
    },
    max: {
      control: false,
    },
    orientation: {
      control: false,
    },
    prefixCls: {
      control: false,
    },
    step: {
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
    onChange: {
      control: false,
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
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
} as Meta<typeof Slider>;

export type SliderStory = StoryObj<typeof Slider>;

export const Default = DefaultTest;

export const Disabled = DisabledTest;

export const Color = ColorTest;

export const Controlled = ControlledTest;

export const Uncontrolled = UnControlledTest;

export const Vertical = VerticalTest;

export const WithForm = WithFormTest;
