import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Summary } from '../components/summary/summary';
import { Color } from '../global/enum';


export default {
    title: 'Example/Summary',
    component: Summary,
    argTypes: {
        prefixCls: {
            control: false,
        },
        color: {
            control: false,
        }
    },

} as Meta<typeof Summary>;

type Story = StoryObj<typeof Summary>;

const TestDefault = () => {

    return (
        <>
            <Summary color={Color.note}>
                <strong>This is </strong>
                test.
                <code>name</code>
            </Summary>
            <Summary color={Color.warning}>
                <strong>This is </strong>
                test.
                <code>name</code>
            </Summary>
            <Summary color={Color.deep}>
                <strong>This is </strong>
                test.
                <code>name</code>
            </Summary>
        </>
    );
}

export const DefaultTest: Story = {
    render: () => <TestDefault />
};
