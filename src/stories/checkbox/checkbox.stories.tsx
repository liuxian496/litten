import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../../components/checkbox/checkbox';

import { Default } from './defaultTest';
import { CheckedTest } from './checkedTest';
import { ControlledTest } from './controlledTest';
import { DisabledTest } from './disabledTest';
import { SizeTest } from './sizeTest';
import { IndeterminateTest } from './indeterminateTest';

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
    ControlledTest,
    DisabledTest,
    IndeterminateTest,
    SizeTest,
};
