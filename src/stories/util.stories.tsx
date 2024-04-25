import { Meta, StoryObj } from "@storybook/react";

import { StopPropagationTest } from "../test/util/stopPropagationTest";
import { UsePreviousTest } from "../test/util/usePreviousTest";
import { UseRelativePositionTest } from "../test/util/useRelativePositionTest";

export default {
  title: "Example/Util",
} as Meta;

export type UtilStory = StoryObj;

export const StopPropagation = {
  name: "stopPropagation",
  ...StopPropagationTest,
};

export const UsePrevious = {
  name: "usePrevious",
  ...UsePreviousTest,
};

export const UseRelativePosition = {
  name: "useRelativePosition",
  ...UseRelativePositionTest,
};
