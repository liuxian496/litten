import React from 'react';

import { SummaryStory } from './summary.stories';

import { Color } from '../../global/enum';
import { Summary } from '../../components/summary/summary';

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

export const Default: SummaryStory = {
    render: () => <TestDefault />
};
