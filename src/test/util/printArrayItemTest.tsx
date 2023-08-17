import React from 'react';

import { UtilStory } from '../../stories/util.stories';

import { printArrayItem } from '../../global/util';

export const PrintArrayItemTest: UtilStory = {
    render: () => {
        return (
            <>
                <p>{printArrayItem([{
                    x: 1,
                    y: 2
                }, {
                    x: 2,
                    y: 3
                }])}</p>
                <p>{printArrayItem()}</p>
            </>
        )
    }
};