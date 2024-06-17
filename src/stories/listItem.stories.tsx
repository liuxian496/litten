import { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "../components/listItem/listItem";

import { TemplateTest } from "../test/listItem/listItemTemplateTest";
import { RenderByArrayTest } from "../test/listItem/listItemRenderByArrayTest";

const meta: Meta<typeof ListItem> = {
    title: "Example/ListItem",
    component: ListItem,
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
            sort: "requiredFirst",
        },
    },
};

export default meta;
export type ListItemStory = StoryObj<typeof ListItem>;

export const Template = TemplateTest;

export const RenderByArray = RenderByArrayTest;
