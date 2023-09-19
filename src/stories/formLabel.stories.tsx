import { Meta, StoryObj } from "@storybook/react";

import { FormLabel } from "../components/formLabel/formLabel";

import { DefaultTest } from "../test/formLabel/formLabelDefaultTest";

export default {
    title: "Example/FormLabel",
    component: FormLabel,
    argTypes: {
        prefixCls: {
            control: false,
        },
        style: {
            control: false,
        },
        //在示例文档中移除children属性的显示
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
} as Meta<typeof FormLabel>;

export type FormLabelStory = StoryObj<typeof FormLabel>;

export const Default = DefaultTest;
