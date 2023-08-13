import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../components/checkbox/checkbox';

import { Default } from '../test/checkbox/default.test';
import { CheckedTest } from '../test/checkbox/checked.test';
import { ControlledTest } from '../test/checkbox/controlled.test';
import { DisabledTest } from '../test/checkbox/disabled.test';
import { SizeTest } from '../test/checkbox/size.test';
import { IndeterminateTest } from '../test/checkbox/indeterminate.test';
import { ColorTest } from '../test/checkbox/color.test';

const meta: Meta<typeof Checkbox> = {
    title: 'Example/Checkbox',
    component: Checkbox,
    argTypes: {
        "aria-label": {
            table: {
                disable: true,
            },
        },
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
        name: {
            table: {
                disable: true,
            },
        },
        style: {
            table: {
                disable: true,
            },
        },
        tabindex: {
            table: {
                disable: true,
            },
        },
        value: {
            table: {
                disable: true,
            },
        },
        onChange: {
            action: 'checked change'
        },
    },
    parameters: {
        controls: {
            expanded: true,
            sort: 'requiredFirst'
        }
    },
};

export default meta;
export type CheckboxStory = StoryObj<typeof Checkbox>;

export {
    Default,
    CheckedTest,
    ColorTest,
    ControlledTest,
    DisabledTest,
    IndeterminateTest,
    SizeTest,
};
