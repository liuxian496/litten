import React, { useState } from 'react';

import { UtilStory } from './util.stories';

import { usePrevious } from '../../global/util';
import { Mode } from '../../global/enum';
import { Button } from '../../components/button/button';

const TestUsePrevious = () => {
    const [value, setValue] = useState(0);
    const lastValue = usePrevious(value);

    function handleClick() {
        setValue(value + 1);
    }

    function handleSubtractClick() {
        setValue(value - 1);
    }

    return (
        <div>
            <p>Current：{value}</p>
            <p>Previous：{lastValue}</p>
            <Button style={{ marginRight: '10px' }} mode={Mode.outlined} onClick={handleClick}>Add</Button>
            <Button mode={Mode.outlined} onClick={handleSubtractClick}>subtract</Button>
        </div>
    )
}

export const UsePreviousTest: UtilStory = {
    render: () => <TestUsePrevious />
}