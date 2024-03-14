import React from 'react';

import { UtilStory } from '../../stories/util.stories';

import { getPrefixNs } from '../../components/control/userControl';

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