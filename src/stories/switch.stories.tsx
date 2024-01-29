import { Meta, StoryObj } from "@storybook/react";

import { Switch } from "../components/switch/switch";

import { CheckedTest } from "../test/switch/switchCheckedTest";
import { ColorTest } from "../test/switch/switchColorTest";
import { ControlledTest } from "../test/switch/switchControlledTest";
import { DefaultTest } from "../test/switch/switchDefaultTest";
import { DisabledTest } from "../test/switch/switchDisabledTest";
import { SizeTest } from "../test/switch/switchSizeTest";
import { UnControlledTest } from "../test/switch/switchUnControlledTest";
import { WithFormTest } from "../test/switch/switchWithFormTest";

export default {
    title: "Example/Switch",
    component: Switch,
    argTypes: {
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
        name: {
            table: {
                disable: true,
            },
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
        onChange: {
            control: false,
        },
    },
    parameters: {
        controls: {
            expanded: true,
            sort: "requiredFirst",
        },
    },
} as Meta<typeof Switch>;

export type SwitchStory = StoryObj<typeof Switch>;

export const Default = DefaultTest;

export const Checked = CheckedTest;

export const Color = ColorTest;

export const Controlled = ControlledTest;

export const Disabled = DisabledTest;

export const Size = SizeTest;

export const WithForm = WithFormTest;

export const Uncontrolled = UnControlledTest;
