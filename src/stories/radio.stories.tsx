import { Meta, StoryObj } from '@storybook/react';

import { Radio } from '../components/radio/radio';

import { DefaultTest } from '../test/radio/radioDefaultTest';
import { StandaloneRadioTest } from '../test/radio/standaloneRadioTest';
import { RadioGroupTest } from '../test/radio/radioGroupTest';
import { RadioWithFormTest } from '../test/radio/radioWithFormTest';

const meta: Meta<typeof Radio> = {
    title: 'Example/Radio',
    component: Radio,
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
        tabIndex: {
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
            control: false,
        }
        // onChange: {
        //     action: 'checked change'
        // },
    },
    parameters: {
        controls: {
            expanded: true,
            sort: 'requiredFirst'
        }
    },
};

export default meta;

export type RadioStory = StoryObj<typeof Radio>;

export const Default = DefaultTest;
export const StandaloneRadio = StandaloneRadioTest;
export const RadioGroup = RadioGroupTest;
export const WithForm = RadioWithFormTest;
