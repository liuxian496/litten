import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "../components/checkbox/checkbox";

import { DefaultTest } from "../test/checkbox/checkboxDefaultTest";
import { CheckedTest } from "../test/checkbox/checkboxCheckedTest";
import { ControlledTest } from "../test/checkbox/checkboxControlledTest";
import { DisabledTest } from "../test/checkbox/checkboxDisabledTest";
import { SizeTest } from "../test/checkbox/checkboxSizeTest";
import { IndeterminateTest } from "../test/checkbox/checkboxIndeterminateTest";
import { ColorTest } from "../test/checkbox/checkboxColorTest";
import { CheckboxWithFormTest } from "../test/checkbox/checkboxWithFormTest";

const meta: Meta<typeof Checkbox> = {
    title: "Example/Checkbox",
    component: Checkbox,
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
};

export default meta;
export type CheckboxStory = StoryObj<typeof Checkbox>;

export const Default = DefaultTest;

export const Checked = CheckedTest;

export const Color = ColorTest;

export const Controlled = ControlledTest;

export const Disabled = DisabledTest;

export const Indeterminate = IndeterminateTest;

export const Size = SizeTest;

export const WithForm = CheckboxWithFormTest;
