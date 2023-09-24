import { Meta, StoryObj } from "@storybook/react";

import { DefaultTest } from "../test/stackPanel/stackPanelDefaultTest";
import { StackPanel } from "../components/stackPanel/stackPanel";

export default {
    title: "Example/StackPanel",
    component: StackPanel,
    argTypes: {
        prefixCls: {
            control: false,
        },
        style: {
            control: false,
        },
        children: {
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
} as Meta<typeof StackPanel>;

export type StackPanelStory = StoryObj<typeof StackPanel>;

export const Default = DefaultTest;
