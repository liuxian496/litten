import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/button/button";

import { DefaultTest } from "../test/button/buttonDefaultTest";
import { FocusTest } from "../test/button/buttonFocusTest";
import { DisabledTest } from "../test/button/buttonDisabledTest";
import { ClickTest } from "../test/button/buttonClickTest";
import { ColorTest } from "../test/button/buttonColorTest";
import { IconTest } from "../test/button/buttonIconTest";

const meta: Meta<typeof Button> = {
    title: "Example/Button",
    component: Button,
    argTypes: {
        endIcon: {
            control: false,
        },
        children: {
            table: {
                disable: true,
            },
        },
        prefixCls: {
            control: false,
        },
        rippleColor: {
            control: false,
        },
        startIcon: {
            control: false,
        },
        style: {
            control: false,
        },
        tabIndex: {
            table: {
                disable: true,
            },
        },
        onClick: {
            action: "点击",
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
export type ButtonStory = StoryObj<typeof Button>;

export const Default = DefaultTest;

export const Color = ColorTest;

export const Disabled = DisabledTest;

export const Focus = FocusTest;

export const Icon = IconTest;

export const Click = ClickTest;
