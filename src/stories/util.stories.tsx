import { Meta, StoryObj } from "@storybook/react";

import { StopPropagationTest } from "../test/util/stopPropagationTest";

export default {
  title: "Example/Util",
} as Meta;

export type UtilStory = StoryObj;

export const StopPropagation = {
  name: "stopPropagation",
  ...StopPropagationTest,
};
