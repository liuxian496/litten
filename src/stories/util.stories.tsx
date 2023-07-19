import React, { useState } from 'react';
import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/button/button';
import {getPrefixNs} from '../components/control/control';
import {handleMouseStopPropagation, printArrayItem, usePrevious } from '../global/util';
import { Mode } from '../global/enum';


export default {
    title: 'Example/Util',
} as Meta;

type Story = StoryObj;

export const getPrefixNsTest: Story = {
    render: () => {
        return (
            <>
                <p>{getPrefixNs('button','ford')}</p>
                <p>{getPrefixNs('button')}</p>
                <p>{getPrefixNs('button'," ")}</p>
            </>
        )
    }
}

const TestDefault = () => {
    const [text, setText] = useState("");

    function handleDivClick() {
        setText('div clicked')
    }

    function handleStopClick(e: React.MouseEvent) {
        handleMouseStopPropagation(e);
    }

    return (
        <>
            <div onClick={handleDivClick}>
                <Button onClick={handleStopClick} mode={Mode.primary}>Stop Propagation</Button>
                <Button>Normal</Button>
            </div>
            <div>{text}</div>
        </>
    );
}

export const StopPropagationTest: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestDefault />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByText('Stop Propagation'));

        await expect(
            canvas.queryByText('div clicked')
        ).not.toBeInTheDocument();

        await fireEvent.click(canvas.getByText('Normal'));

        await expect(
            canvas.queryByText('div clicked')
        ).toBeInTheDocument();

    }
};

export const printArrayItemTest: Story = {
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

export const usePreviousTest: Story = {
    render: () => <TestUsePrevious />
}