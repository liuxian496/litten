import React, { ChangeEvent, useState } from 'react';

import { TextFiledStory } from './textField.stories';

import { Mode } from '../../global/enum';
import { LittenEvent } from '../../components/control/control.types';
import { TextField } from '../../components/textField/textField';
import { Button } from '../../components/button/button';

const TestDefault = () => {
    const [value, setValue] = useState('');
    const [targetValue, setTargetValue] = useState<string | undefined>('');

    function handleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { e, value } = event;

        setTargetValue(e?.target.value);
        setValue(value);
    }

    function handleTestClick() {
        setValue('100');
    }


    return (
        <>
            <div>
                <TextField value={value} defaultValue="nihao" onChange={handleChange} />
                <TextField disabled defaultValue='2233' style={{ marginLeft: '10px', marginRight: '10px' }} />
                <Button mode={Mode.primary} onClick={handleTestClick}>Set value to 100</Button>
            </div>
            <div>{`value is: ${value}`}</div>
            <div>{`e.target.value is: ${targetValue}`}</div>
        </>
    );
}

export const Default: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    args: {},
    render: () => <TestDefault />,
};