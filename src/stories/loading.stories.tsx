import { Meta, StoryObj } from '@storybook/react';

import { Loading } from '../components/loading/loading';

import { DefaultTest } from "../test/loading/loadingDefaultTest";



const meta: Meta<typeof Loading> = {
    title: "Example/Loading",
    component: Loading,
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
export type LoadingStory = StoryObj<typeof Loading>;

export type UtilStory = StoryObj;

export const Default = DefaultTest;
