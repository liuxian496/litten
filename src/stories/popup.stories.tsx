import { Meta, StoryObj } from "@storybook/react";

import { PopupTest } from "../test/popup/popupTest";
import { OverLayTest } from "../test/popup/overlayTest";

export default {
    title: "Example/Popup",
} as Meta;

export type UtilStory = StoryObj;

export const Popup = PopupTest;
export const Overlay = OverLayTest;
