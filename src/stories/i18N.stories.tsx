import { Meta, StoryObj } from "@storybook/react";

import { Localization } from "../test/local/localization.test";
import { I18N } from "../test/local/i18N.test";

export default {
  title: "Example/Local",
} as Meta<typeof Object>;

export type LocalStory = StoryObj<typeof Object>;

export { I18N, Localization };
