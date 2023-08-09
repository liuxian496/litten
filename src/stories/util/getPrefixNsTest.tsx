import React from 'react';

import { UtilStory } from './util.stories';

import { getPrefixNs } from '../../components/control/control';

export const GetPrefixNsTest: UtilStory = {
    render: () => {
        return (
            <>
                <p>{getPrefixNs('button', 'ford')}</p>
                <p>{getPrefixNs('button')}</p>
                <p>{getPrefixNs('button', " ")}</p>
            </>
        )
    }
};